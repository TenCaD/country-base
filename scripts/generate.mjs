import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourceFile = path.join(rootDir, "source", "countries.json");
const distDir = path.join(rootDir, "dist");
const indexesDir = path.join(distDir, "indexes");
const sharedCallingCodeRoots = new Set(["+1", "+7"]);

const countries = JSON.parse(await readFile(sourceFile, "utf8"));

const byIso2 = {};
const indexes = {
  iso2: {},
  iso3: {},
  "name-full": {},
  "name-simple": {},
  phone: {},
  currency: {},
  subregion: {},
  "language-code": {},
  "language-name": {}
};

function normalizeKey(value) {
  return String(value ?? "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/['’]/g, "")
    .replace(/[^\p{Letter}\p{Number}]+/gu, " ")
    .trim()
    .replace(/\s+/g, " ");
}

function addUnique(list, value) {
  if (value && !list.includes(value)) list.push(value);
}

function addMulti(index, key, iso2) {
  if (!key) return;
  index[key] ??= [];
  addUnique(index[key], iso2);
}

function addName(index, name, iso2) {
  const key = normalizeKey(name);
  addMulti(index, key, iso2);
}

function phoneNumbers(country) {
  const root = country.idd?.root;
  if (!root) return [];

  const suffixes = Array.isArray(country.idd?.suffixes) ? country.idd.suffixes : [];
  if (suffixes.length === 0) return [root, root.replace(/^\+/, "")];

  const numbers = suffixes.flatMap((suffix) => {
    const number = `${root}${suffix}`;
    return [number, number.replace(/^\+/, "")];
  });

  if (sharedCallingCodeRoots.has(root)) {
    numbers.push(root, root.replace(/^\+/, ""));
  }

  return numbers;
}

for (const country of countries) {
  const iso2 = country.cca2;
  if (!iso2) continue;

  byIso2[iso2] = country;
  indexes.iso2[iso2] = iso2;

  if (country.cca3) indexes.iso3[country.cca3] = iso2;

  addName(indexes["name-full"], country.name?.official, iso2);
  addName(indexes["name-simple"], country.name?.common, iso2);

  for (const spelling of country.altSpellings ?? []) {
    addName(indexes["name-simple"], spelling, iso2);
  }

  for (const translation of Object.values(country.translations ?? {})) {
    addName(indexes["name-full"], translation?.official, iso2);
    addName(indexes["name-simple"], translation?.common, iso2);
  }

  for (const nativeName of Object.values(country.name?.native ?? {})) {
    addName(indexes["name-full"], nativeName?.official, iso2);
    addName(indexes["name-simple"], nativeName?.common, iso2);
  }

  for (const number of phoneNumbers(country)) {
    addMulti(indexes.phone, number, iso2);
  }

  for (const currencyCode of Object.keys(country.currencies ?? {})) {
    addMulti(indexes.currency, currencyCode, iso2);
  }

  addMulti(indexes.subregion, normalizeKey(country.subregion), iso2);

  for (const [languageCode, languageName] of Object.entries(country.languages ?? {})) {
    addMulti(indexes["language-code"], languageCode, iso2);
    addMulti(indexes["language-name"], normalizeKey(languageName), iso2);
  }
}

for (const index of Object.values(indexes)) {
  for (const value of Object.values(index)) {
    if (Array.isArray(value)) value.sort();
  }
}

await rm(distDir, { recursive: true, force: true });
await mkdir(indexesDir, { recursive: true });

await writeModulePair("data", "countriesByIso2", byIso2, {
  defaultName: "countriesByIso2",
  dts: [
    'import type { Country, CountryCodeIso2 } from "country-lookup";',
    "export declare const countriesByIso2: Readonly<Record<CountryCodeIso2, Country>>;",
    "export declare const countries: readonly Country[];",
    "export declare const countryCodes: readonly CountryCodeIso2[];",
    "export default countriesByIso2;"
  ].join("\n"),
  extraMjs: "const countries = Object.values(countriesByIso2);\nexport { countries };\n",
  extraCjs: "const countries = Object.values(countriesByIso2);\nmodule.exports.countries = countries;\n",
  afterExtraMjs: "const countryCodes = Object.keys(countriesByIso2);\nexport { countryCodes };\n",
  afterExtraCjs: "const countryCodes = Object.keys(countriesByIso2);\nmodule.exports.countryCodes = countryCodes;\n"
});

for (const [fileName, value] of Object.entries(indexes)) {
  const exportName = toIdentifier(fileName);
  await writeModulePair(path.join("indexes", fileName), exportName, value, {
    defaultName: exportName,
    dts: indexDts(fileName, exportName)
  });
}

await writeFile(path.join(indexesDir, "index.mjs"), allIndexesMjs(), "utf8");
await writeFile(path.join(indexesDir, "index.cjs"), allIndexesCjs(), "utf8");
await writeFile(path.join(indexesDir, "index.d.ts"), allIndexesDts(), "utf8");

await writeFile(path.join(distDir, "index.mjs"), rootMjs(), "utf8");
await writeFile(path.join(distDir, "index.cjs"), rootCjs(), "utf8");
await writeFile(path.join(distDir, "index.d.ts"), rootDts(), "utf8");

console.log(`Generated ${countries.length} countries and ${Object.keys(indexes).length} indexes.`);

async function writeModulePair(relativeName, exportName, value, options) {
  const modulePath = path.join(distDir, `${relativeName}.mjs`);
  const cjsPath = path.join(distDir, `${relativeName}.cjs`);
  const dtsPath = path.join(distDir, `${relativeName}.d.ts`);
  const json = stableStringify(value);

  await mkdir(path.dirname(modulePath), { recursive: true });
  await writeFile(
    modulePath,
    `const ${exportName} = Object.assign(Object.create(null), ${json});\n${options.extraMjs ?? ""}${options.afterExtraMjs ?? ""}export { ${exportName} };\nexport default ${options.defaultName};\n`,
    "utf8"
  );
  await writeFile(
    cjsPath,
    `"use strict";\nconst ${exportName} = Object.assign(Object.create(null), ${json});\nmodule.exports = { ${exportName}, default: ${exportName} };\n${options.extraCjs ?? ""}${options.afterExtraCjs ?? ""}`,
    "utf8"
  );
  await writeFile(dtsPath, `${options.dts}\n`, "utf8");
}

function toIdentifier(fileName) {
  return fileName.replace(/-([a-z])/g, (_, char) => char.toUpperCase());
}

function stableStringify(value) {
  return `${JSON.stringify(sortObject(value), null, 2)}\n`;
}

function sortObject(value) {
  if (Array.isArray(value)) return value.map(sortObject);
  if (!value || typeof value !== "object") return value;

  return Object.fromEntries(
    Object.keys(value)
      .sort()
      .map((key) => [key, sortObject(value[key])])
  );
}

function indexDts(fileName, exportName) {
  const type = ["iso2", "iso3"].includes(fileName) ? "SingleCountryIndex" : "MultiCountryIndex";
  const keyType = knownIndexKeyType(fileName);
  return [
    `import type { ${type}, CountryCodeIso2, CountryCodeIso3 } from "country-lookup";`,
    `export declare const ${exportName}: ${type}<${keyType}>;`,
    `export default ${exportName};`,
    `export type { ${type} };`
  ].join("\n");
}

function rootMjs() {
  return `import { countries, countryCodes, countriesByIso2 } from "./data.mjs";

export { countries, countryCodes, countriesByIso2 };

export function normalizeKey(value) {
  return String(value ?? "")
    .normalize("NFKD")
    .replace(/[\\u0300-\\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/['’]/g, "")
    .replace(/[^\\p{Letter}\\p{Number}]+/gu, " ")
    .trim()
    .replace(/\\s+/g, " ");
}

export function normalizeIso2(value) {
  const code = String(value ?? "").trim().toUpperCase();
  return code.length === 2 ? code : "";
}

export function getCountryByIso2(value) {
  const code = normalizeIso2(value);
  return code ? countriesByIso2[code] : undefined;
}

export function hasCountryByIso2(value) {
  return getCountryByIso2(value) !== undefined;
}

export function listCountryCodes() {
  return countryCodes;
}
`;
}

function rootCjs() {
  return `"use strict";
const data = require("./data.cjs");
const countriesByIso2 = data.countriesByIso2;
const countries = data.countries;
const countryCodes = data.countryCodes;

function normalizeKey(value) {
  return String(value ?? "")
    .normalize("NFKD")
    .replace(/[\\u0300-\\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/['’]/g, "")
    .replace(/[^\\p{Letter}\\p{Number}]+/gu, " ")
    .trim()
    .replace(/\\s+/g, " ");
}

function normalizeIso2(value) {
  const code = String(value ?? "").trim().toUpperCase();
  return code.length === 2 ? code : "";
}

function getCountryByIso2(value) {
  const code = normalizeIso2(value);
  return code ? countriesByIso2[code] : undefined;
}

function hasCountryByIso2(value) {
  return getCountryByIso2(value) !== undefined;
}

function listCountryCodes() {
  return countryCodes;
}

module.exports = {
  countries,
  countryCodes,
  countriesByIso2,
  normalizeKey,
  normalizeIso2,
  getCountryByIso2,
  hasCountryByIso2,
  listCountryCodes
};
`;
}

function rootDts() {
  const iso2Union = literalUnion(Object.keys(byIso2));
  const iso3Union = literalUnion(countries.map((country) => country.cca3).filter(Boolean));

  return `export type CountryCodeIso2 = ${iso2Union};
export type CountryCodeIso3 = ${iso3Union};
export type NormalizedKey = string;
export type SingleCountryIndex<K extends string = never> = Readonly<
  Record<string, CountryCodeIso2 | undefined> & Record<K, CountryCodeIso2>
>;
export type MultiCountryIndex<K extends string = never> = Readonly<
  Record<string, readonly CountryCodeIso2[] | undefined> & Record<K, readonly CountryCodeIso2[]>
>;

export interface CountryNameValue {
  official: string;
  common: string;
}

export interface Country {
  name: {
    common: string;
    official: string;
    native?: Record<string, CountryNameValue>;
  };
  tld?: string[];
  cca2: CountryCodeIso2;
  ccn3?: string;
  cca3?: CountryCodeIso3;
  cioc?: string;
  independent?: boolean;
  status?: string;
  unMember?: boolean;
  unRegionalGroup?: string;
  currencies?: Record<string, { name: string; symbol?: string }>;
  idd?: { root?: string; suffixes?: string[] };
  capital?: string[];
  altSpellings?: string[];
  region?: string;
  subregion?: string;
  languages?: Record<string, string>;
  translations?: Record<string, CountryNameValue>;
  latlng?: [number, number];
  landlocked?: boolean;
  borders?: string[];
  area?: number;
  flag?: string;
  demonyms?: Record<string, { f: string; m: string }>;
  [key: string]: unknown;
}

export declare const countriesByIso2: Readonly<Record<CountryCodeIso2, Country>>;
export declare const countries: readonly Country[];
export declare const countryCodes: readonly CountryCodeIso2[];
export declare function normalizeKey(value: unknown): NormalizedKey;
export declare function normalizeIso2(value: unknown): string;
export declare function getCountryByIso2(value: unknown): Country | undefined;
export declare function hasCountryByIso2(value: unknown): boolean;
export declare function listCountryCodes(): CountryCodeIso2[];
`;
}

function literalUnion(values) {
  return values
    .sort()
    .map((value) => JSON.stringify(value))
    .join(" | ");
}

function knownIndexKeyType(fileName) {
  if (fileName === "iso2") return "CountryCodeIso2";
  if (fileName === "iso3") return "CountryCodeIso3";
  return "never";
}

function allIndexesMjs() {
  return `export { iso2 } from "./iso2.mjs";
export { iso3 } from "./iso3.mjs";
export { nameFull } from "./name-full.mjs";
export { nameSimple } from "./name-simple.mjs";
export { phone } from "./phone.mjs";
export { currency } from "./currency.mjs";
export { subregion } from "./subregion.mjs";
export { languageCode } from "./language-code.mjs";
export { languageName } from "./language-name.mjs";
`;
}

function allIndexesCjs() {
  return `"use strict";
module.exports = {
  iso2: require("./iso2.cjs").iso2,
  iso3: require("./iso3.cjs").iso3,
  nameFull: require("./name-full.cjs").nameFull,
  nameSimple: require("./name-simple.cjs").nameSimple,
  phone: require("./phone.cjs").phone,
  currency: require("./currency.cjs").currency,
  subregion: require("./subregion.cjs").subregion,
  languageCode: require("./language-code.cjs").languageCode,
  languageName: require("./language-name.cjs").languageName
};
`;
}

function allIndexesDts() {
  return `import type { MultiCountryIndex, SingleCountryIndex } from "country-lookup";

export declare const iso2: SingleCountryIndex;
export declare const iso3: SingleCountryIndex;
export declare const nameFull: MultiCountryIndex;
export declare const nameSimple: MultiCountryIndex;
export declare const phone: MultiCountryIndex;
export declare const currency: MultiCountryIndex;
export declare const subregion: MultiCountryIndex;
export declare const languageCode: MultiCountryIndex;
export declare const languageName: MultiCountryIndex;
`;
}
