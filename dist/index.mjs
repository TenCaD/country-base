import { countries, countryCodes, countriesByIso2 } from "./data.mjs";

export { countries, countryCodes, countriesByIso2 };

export function normalizeKey(value) {
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
