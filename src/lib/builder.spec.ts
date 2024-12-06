import * as assert from "node:assert/strict";
import { test } from "node:test";
import { UrlBuilder } from "./builder.js";

test("can set domain", () => {
  let url = new UrlBuilder().new().domain("example.com");
  assert.strictEqual(url.toURL().hostname, "example.com");
  assert.strictEqual(url.build(), "https://example.com/");
});

test("can set path", () => {
  let url = new UrlBuilder().new().path("/path");
  assert.strictEqual(url.toURL().pathname, "/path");
  assert.strictEqual(url.build(), "https://example.com/path");
});

test("can set searchParams", () => {
  let url = new UrlBuilder().new().param("q", "my search");
  assert.strictEqual(url.toURL().searchParams.get("q"), "my search");
  assert.strictEqual(url.build(), "https://example.com/?q=my+search");
});

test("can set searchParams thats not a string", () => {
  let url = new UrlBuilder()
    .new()
    .param<number>("userId", 5)
    .param("filter", "category");

  assert.strictEqual(url.toURL().searchParams.get("userId"), "5");
  assert.strictEqual(url.toURL().searchParams.get("filter"), "category");

  assert.strictEqual(
    url.build(),
    "https://example.com/?userId=5&filter=category",
  );
});

test("builders", () => {
  let instance = new UrlBuilder()
    .new()
    .domain("site.com")
    .param("q", "my search")
    .param<number>("userId", 5)
    .param<string>("filter", "category");

  assert.ok(instance instanceof UrlBuilder);
  assert.ok(instance.toURL() instanceof URL);
  assert.ok(typeof instance.href === "string");
  assert.ok(typeof instance.toString() === "string");
});
