# country-base

Pre-indexed country data for high-load JavaScript and TypeScript projects.

The package avoids repeated `Array.find()` scans. Countries are stored by ISO-2
code, and every secondary lookup is shipped as a separate importable index.

## What is country-base?

`country-base` is a zero-dependency TypeScript/JavaScript library for fast
country lookups.

It provides ready-to-use country data indexed by ISO-2 code, plus optional
prebuilt indexes for ISO-3, country names, phone codes, currencies, subregions,
and languages.

Best for high-load projects, APIs, validation layers, forms, checkout flows,
analytics pipelines, and any code path where repeated `Array.find()` lookups are
too wasteful.

## Install

```bash
npm install country-base
```

## Basic Usage

```ts
import { getCountryByIso2 } from "country-base";

const country = getCountryByIso2("us");

console.log(country?.name.common);
// United States

console.log(country?.cca2, country?.cca3);
// US USA
```

## All Countries

```ts
import { countries } from "country-base";

console.log(countries.length);
// 250

for (const country of countries) {
  console.log(country.cca2, country.name.common);
}
// AD Andorra
// AE United Arab Emirates
// AF Afghanistan
// ...
```

`countries` is a ready-to-use shared array, so it does not rebuild on every use.

The root import loads the full country dataset keyed by ISO-2 and exposes the
shared all-countries array. Secondary lookup indexes are loaded only when you
import their `country-base/indexes/*` entrypoints.

```ts
import { iso3 } from "country-base/indexes/iso3";
import { countriesByIso2 } from "country-base/data";

const iso2 = iso3.USA;
const country = iso2 ? countriesByIso2[iso2] : undefined;

console.log(iso2);
// US

console.log(country?.name.official);
// United States of America
```

## Separate Indexes

```ts
import { nameSimple } from "country-base/indexes/name-simple";
import { phone } from "country-base/indexes/phone";
import { currency } from "country-base/indexes/currency";
import { normalizeKey } from "country-base";

const byName = nameSimple[normalizeKey("United States")];
const byPhone = phone["+1"];
const byCurrency = currency.USD;

console.log(byName);
// ["US"]

console.log(byPhone);
// ["AG", "AI", "AS", "BB", "BM", "BS", "CA", "DM", "DO", "GD", "GU", "JM", "KN", "KY", "LC", "MP", "MS", "PR", "SX", "TC", "TT", "US", "VC", "VG", "VI"]

console.log(byCurrency);
// ["AS", "BQ", "BS", "EC", "GU", "IO", "KH", "MH", "MP", "PA", "PR", "PW", "SV", "TC", "TL", "UM", "US", "VG", "VI", "ZW"]
```

## Country Object Excerpt

Shortened excerpt from `getCountryByIso2("US")`:

```ts
const country = {
  altSpellings: ["US", "USA", "United States of America"],
  area: 9372610,
  borders: ["CAN", "MEX"],
  capital: ["Washington D.C."],
  cca2: "US",
  cca3: "USA",
  ccn3: "840",
  cioc: "USA",
  currencies: {
    USD: {
      name: "United States dollar",
      symbol: "$"
    }
  },
  demonyms: {
    eng: {
      f: "American",
      m: "American"
    },
    fra: {
      f: "Américaine",
      m: "Américain"
    }
  },
  flag: "🇺🇸",
  idd: {
    root: "+1",
    suffixes: [
      "201",
      "202",
      "203",
      "205"
      // ...more NANP area codes
    ]
  },
  independent: true,
  landlocked: false,
  languages: {
    eng: "English"
  },
  latlng: [38, -97],
  name: {
    common: "United States",
    native: {
      eng: {
        common: "United States",
        official: "United States of America"
      }
    },
    official: "United States of America"
  },
  region: "Americas",
  status: "officially-assigned",
  subregion: "North America",
  tld: [".us"],
  translations: {
    deu: {
      common: "Vereinigte Staaten",
      official: "Vereinigte Staaten von Amerika"
    },
    fra: {
      common: "États-Unis",
      official: "Les états-unis d'Amérique"
    },
    rus: {
      common: "Соединённые Штаты Америки",
      official: "Соединенные Штаты Америки"
    },
    zho: {
      common: "美国",
      official: "美利坚合众国"
    }
    // Also includes: ara, bre, ces, est, fin, hrv, hun, ita, jpn,
    // kor, nld, per, pol, por, slk, spa, srp, swe, tur, urd
  },
  unMember: true,
  unRegionalGroup: "Western European and Others Group"
};
```

Available indexes:

| Import | Key format | Value |
|---|---|---|
| `country-base/indexes/iso2` | ISO-2 code, for example `US` | `CountryCodeIso2` |
| `country-base/indexes/iso3` | ISO-3 code, for example `USA` | `CountryCodeIso2` |
| `country-base/indexes/name-full` | `normalizeKey(...)` result | `CountryCodeIso2[]` |
| `country-base/indexes/name-simple` | `normalizeKey(...)` result | `CountryCodeIso2[]` |
| `country-base/indexes/phone` | exact calling code with or without `+` | `CountryCodeIso2[]` |
| `country-base/indexes/currency` | currency code, for example `USD` | `CountryCodeIso2[]` |
| `country-base/indexes/subregion` | `normalizeKey(...)` result | `CountryCodeIso2[]` |
| `country-base/indexes/language-code` | language code, for example `eng` | `CountryCodeIso2[]` |
| `country-base/indexes/language-name` | `normalizeKey(...)` result | `CountryCodeIso2[]` |

`country-base/indexes` imports all indexes at once.

Countries without a `subregion` value are not included in the `subregion`
index.

## TypeScript

Types are included. No extra `@types/*` package is required.

```ts
import type { Country, CountryCodeIso2 } from "country-base";
import type { MultiCountryIndex } from "country-base/indexes/currency";
```

## Key Features

- ISO-2 country lookup in O(1)
- Prebuilt indexes for ISO-3, names, phone codes, currencies, subregions, and languages
- Separate index imports so unused lookup maps are not loaded
- TypeScript-first API with bundled types
- Works in Node.js and package-aware runtimes/bundlers, including Bun, Deno via `npm:`, and browser bundlers
- ESM and CommonJS support
- Zero runtime dependencies

## Compared to Alternatives

| Package | Lookup | TypeScript | Bundle strategy | Data source |
|---|---:|---:|---:|---|
| `country-base` | O(1) object maps | Yes | Separate importable indexes | ISO 3166 country data |
| Many country packages | `Array.find()` / full-list scans | Partial | Usually loads full dataset | Varies |
