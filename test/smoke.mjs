import {
  countries,
  countryCodes,
  getCountryByIso2,
  hasCountryByIso2,
  listCountryCodes,
  normalizeKey
} from "../dist/index.mjs";
import { countriesByIso2 } from "../dist/data.mjs";
import { iso3 } from "../dist/indexes/iso3.mjs";
import { nameSimple } from "../dist/indexes/name-simple.mjs";
import { phone } from "../dist/indexes/phone.mjs";
import { currency } from "../dist/indexes/currency.mjs";
import { languageCode } from "../dist/indexes/language-code.mjs";

assert(getCountryByIso2("us")?.cca3 === "USA", "ISO-2 lookup failed");
assert(hasCountryByIso2("US"), "ISO-2 existence check failed");
assert(countries.length === 250, "countries export failed");
assert(countryCodes.length === 250, "countryCodes export failed");
assert(listCountryCodes() === countryCodes, "listCountryCodes should return the shared countryCodes array");
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
