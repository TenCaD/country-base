"use strict";

const {
  countries,
  countryCodes,
  getCountryByIso2,
  hasCountryByIso2,
  listCountryCodes,
  normalizeKey
} = require("../dist/index.cjs");
const { countriesByIso2 } = require("../dist/data.cjs");
const { iso3 } = require("../dist/indexes/iso3.cjs");
const { nameSimple } = require("../dist/indexes/name-simple.cjs");
const { phone } = require("../dist/indexes/phone.cjs");
const { currency } = require("../dist/indexes/currency.cjs");
const { languageCode } = require("../dist/indexes/language-code.cjs");

assert(getCountryByIso2("us")?.cca3 === "USA", "ISO-2 lookup failed");
assert(hasCountryByIso2("US"), "ISO-2 existence check failed");
assert(countries.length === 250, "countries export failed");
assert(countryCodes.length === 250, "countryCodes export failed");
assert(listCountryCodes() === countryCodes, "listCountryCodes should return the shared countryCodes array");
assert(!Object.keys(countriesByIso2).includes("default"), "CJS data export polluted country keys");
assert(countriesByIso2[iso3.USA]?.name?.common === "United States", "ISO-3 index failed");
assert(nameSimple[normalizeKey("United States")]?.includes("US"), "name index failed");
assert(nameSimple[normalizeKey("Соединённые Штаты Америки")]?.includes("US"), "Unicode name index failed");
assert(nameSimple[normalizeKey("美国")]?.includes("US"), "CJK name index failed");
assert(phone["+1"]?.includes("US"), "phone index failed");
assert(phone["+2"] === undefined, "phone index should not include incomplete +2 prefix");
assert(phone["+20"]?.includes("EG"), "phone index exact +20 lookup failed");
assert(phone["+44"]?.includes("GB"), "phone index exact +44 lookup failed");
assert(currency.USD?.includes("US"), "currency index failed");
assert(languageCode.eng?.includes("US"), "language code index failed");
assert(nameSimple.constructor === undefined, "name index should not expose prototype properties");
assert(currency.constructor === undefined, "currency index should not expose prototype properties");

function assert(condition, message) {
  if (!condition) throw new Error(message);
}
