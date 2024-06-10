import { test, expect } from "vitest";
import { url } from "./lib";

test("empty url", () => {
  expect(url``, "");
});

test("basic url", () => {
  expect(url`https://site.com/path`, "https://site.com/path");
});

test("interpolated url", () => {
  let q = "my search";
  expect(
    url`https://site.com/path?q=${q}`,
    "https://site.com/path?q=my%20search",
  );
});

test("interpolated url with undefined and null values", () => {
  let filter = undefined;
  let user = null;
  let q = "my search";
  expect(
    url`https://site.com/path?q=${q}&user=${user}&filter=${filter}`,
    "https://site.com/path?q=my%20search",
  );
});
