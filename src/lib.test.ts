import { test, expect } from "vitest";
import { url } from "./lib";

test("empty url", () => {
  expect(() => url``).toThrowErrorMatchingInlineSnapshot(
    `[TypeError: Invalid URL: ""]`,
  );
});

test("basic url", () => {
  expect(url`ssh://site.com`).toMatchInlineSnapshot(`"ssh://site.com"`);
  expect(url`data://site.com`).toMatchInlineSnapshot(`"data://site.com"`);
  expect(url`mailto://site.com`).toMatchInlineSnapshot(`"mailto://site.com"`);

  // note that the URL constructor will add a trailing slash to the url
  // for certain protocols
  expect(url`http://site.com`).toMatchInlineSnapshot(`"http://site.com/"`);
  expect(url`https://site.com`).toMatchInlineSnapshot(`"https://site.com/"`);
  expect(url`ftp://site.com`).toMatchInlineSnapshot(`"ftp://site.com/"`);
  expect(url`ws://site.com`).toMatchInlineSnapshot(`"ws://site.com/"`);
  expect(url`wss://site.com`).toMatchInlineSnapshot(`"wss://site.com/"`);
  expect(url`file://site.com`).toMatchInlineSnapshot(`"file://site.com/"`);
});

test("uninterpolated url", () => {
  expect(url`https://site.com/path`).toMatchInlineSnapshot(
    `"https://site.com/path"`,
  );
});

test("interpolated url with values", () => {
  let q = "my search";
  let actual = url`https://site.com/path?q=${q}`;
  expect(actual).toMatchInlineSnapshot(`"https://site.com/path?q=my+search"`);
});

test("interpolated url with only undefined/null values", () => {
  let filter = undefined;
  let user = null;
  let q = undefined;
  let actual = url`https://site.com/path?q=${q}&user=${user}&filter=${filter}`;
  expect(actual).toMatchInlineSnapshot(`"https://site.com/path"`);
});

test("interpolated url with valid, and undefined/null values", () => {
  let filter = undefined;
  let user = null;
  let q = "my search";
  let actual = url`https://site.com/path?q=${q}&user=${user}&filter=${filter}`;
  expect(actual).toMatchInlineSnapshot(`"https://site.com/path?q=my+search"`);
});

test("url with all possible options", () => {
  let filter = undefined;
  let user = null;
  let q = "my search";
  let actual = url`https://user:pass@site.com:8080/path?q=${q}&user=${user}&filter=${filter}#hash`;
  expect(actual).toMatchInlineSnapshot(
    `"https://user:pass@site.com:8080/path?q=my+search#hash"`,
  );
});
