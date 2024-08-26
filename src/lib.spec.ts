import * as assert from "node:assert/strict";
import { test } from "node:test";
import { urlString } from "./lib.js";

test("empty url", () => {
  assert.throws(() => urlString``, `[TypeError: Invalid URL: ""]`);
});

test("basic url", () => {
  assert.equal(urlString`ssh://site.com`, "ssh://site.com");
  assert.equal(urlString`data://site.com`, "data://site.com");
  assert.equal(urlString`mailto://site.com`, "mailto://site.com");
  assert.equal(urlString`tel://site.com`, "tel://site.com");

  // note that the URL constructor will add a trailing slash to the url
  // for certain protocols
  assert.equal(urlString`http://site.com`, "http://site.com/");
  assert.equal(urlString`https://site.com`, "https://site.com/");
  assert.equal(urlString`ftp://site.com`, "ftp://site.com/");
  assert.equal(urlString`ws://site.com`, "ws://site.com/");
  assert.equal(urlString`wss://site.com`, "wss://site.com/");
  assert.equal(urlString`file://site.com`, "file://site.com/");
});

test("non-interpolated url", () => {
  assert.equal(urlString`https://site.com/path`, "https://site.com/path");
});

test("interpolated url with values", () => {
  let q = "my search";
  let actual = urlString`https://site.com/path?q=${q}`;
  assert.equal(actual, "https://site.com/path?q=my+search");
});

test("interpolated url with only undefined/null values", () => {
  let filter = undefined;
  let user = null;
  let q = undefined;
  let actual = urlString`https://site.com/path?q=${q}&user=${user}&filter=${filter}`;
  assert.equal(actual, "https://site.com/path");
});

test("interpolated url with valid, and undefined/null values", () => {
  let filter = undefined;
  let user = null;
  let q = "my search";
  let actual = urlString`https://site.com/path?q=${q}&user=${user}&filter=${filter}`;
  assert.equal(actual, "https://site.com/path?q=my+search");
});

test("url with auth, port, query, hash", () => {
  let filter = undefined;
  let user = null;
  let q = "my search";
  let actual = urlString`https://user:pass@site.com:8080/path?q=${q}&user=${user}&filter=${filter}#hash`;
  assert.equal(actual, "https://user:pass@site.com:8080/path?q=my+search#hash");
});

test("url with auth, port, query, hash", () => {
  let filter = undefined;
  let user = "1";
  let q = null;
  let actual = urlString`https://user:pass@site.com:8080/path?q=${q}&user=${user}&filter=${filter}#hash`;
  assert.equal(actual, "https://user:pass@site.com:8080/path?user=1#hash");
});
