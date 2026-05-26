import { countries, getCountryByIso2 } from "../dist/index.mjs";
import { currency } from "../dist/indexes/currency.mjs";

const iterations = 5_000_000;

const cases = [
  {
    name: "get country by ISO-2",
    run() {
      return getCountryByIso2("US");
    }
  },
  {
    name: "find country in array",
    run() {
      return countries.find((country) => country.cca2 === "US");
    }
  },
  {
    name: "get countries by currency",
    run() {
      return currency.USD;
    }
  }
];

for (const testCase of cases) {
  for (let index = 0; index < 100_000; index += 1) testCase.run();

  const startedAt = process.hrtime.bigint();
  let result;

  for (let index = 0; index < iterations; index += 1) {
    result = testCase.run();
  }

  const elapsedNs = Number(process.hrtime.bigint() - startedAt);
  const seconds = elapsedNs / 1e9;
  const opsPerSecond = iterations / seconds;
  const nsPerOperation = elapsedNs / iterations;

  if (!result) {
    throw new Error(`${testCase.name} returned an empty result`);
  }

  console.log(
    `${testCase.name}: ${Math.round(opsPerSecond).toLocaleString("en-US")} ops/sec, ${nsPerOperation.toFixed(1)} ns/op`
  );
}
