import { test, expect } from "vitest";
import { url } from "./lib";

test("empty url", () => {
  expect(() => url``).toThrowError();
});

test("basic url", () => {
  expect(url`https://site.com`).toEqual("https://site.com/");
});

test("uninterpolated url", () => {
  expect(url`https://site.com/path`).toEqual("https://site.com/path");
});

test("interpolated url with values", () => {
  let q = "my search";
  let actual = url`https://site.com/path?q=${q}`;
  let expected = "https://site.com/path?q=my+search";
  expect(actual).toEqual(expected);
});

test("interpolated url with only undefined/null values", () => {
  let filter = undefined;
  let user = null;
  let q = undefined;
  let actual = url`https://site.com/path?q=${q}&user=${user}&filter=${filter}`;
  let expected = "https://site.com/path";
  expect(actual).toEqual(expected);
});

test("interpolated url with valid, and undefined/null values", () => {
  let filter = undefined;
  let user = null;
  let q = "my search";
  let actual = url`https://site.com/path?q=${q}&user=${user}&filter=${filter}`;
  let expected = "https://site.com/path?q=my+search";
  expect(actual).toEqual(expected);
});

test("url with all possible options", () => {
  let filter = undefined;
  let user = null;
  let q = "my search";
  let actual = url`https://user:pass@site.com:8080/path?q=${q}&user=${user}&filter=${filter}#hash`;
  let expected = "https://user:pass@site.com:8080/path?q=my+search#hash";
  expect(actual).toEqual(expected);
});
