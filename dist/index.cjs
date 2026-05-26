"use strict";
const data = require("./data.cjs");
const countriesByIso2 = data.countriesByIso2;
const countries = data.countries;
const countryCodes = data.countryCodes;

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
