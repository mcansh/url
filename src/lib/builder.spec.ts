import * as assert from "node:assert/strict";
import { describe, it } from "node:test";
import { UrlBuilder } from "./builder.ts";

describe("UrlBuilder", () => {
  it("should build a basic URL", () => {
    const builder = UrlBuilder().new();
    const url = builder.protocol("https").domain("example.com").build();
    assert.equal(url, "https://example.com/");
  });

  it("should build a URL with path", () => {
    const builder = UrlBuilder().new();
    const url = builder
      .protocol("https")
      .domain("example.com")
      .path("/test")
      .build();
    assert.equal(url, "https://example.com/test");
  });

  it("should build a URL with query parameters", () => {
    const builder = UrlBuilder().new();
    const url = builder
      .protocol("https")
      .domain("example.com")
      .param("key", "value")
      .build();
    assert.equal(url, "https://example.com/?key=value");
  });

  it("should build a URL with hash", () => {
    const builder = UrlBuilder().new();
    const url = builder
      .protocol("https")
      .domain("example.com")
      .hash("section")
      .build();
    assert.equal(url, "https://example.com/#section");
  });

  it("should build a URL with username and password", () => {
    const builder = UrlBuilder().new();
    const url = builder
      .protocol("https")
      .domain("example.com")
      .username("user")
      .password("pass")
      .build();
    assert.equal(url, "https://user:pass@example.com/");
  });

  it("should build a URL with port", () => {
    const builder = UrlBuilder().new();
    const url = builder
      .protocol("https")
      .domain("example.com")
      .port(8080)
      .build();
    assert.equal(url, "https://example.com:8080/");
  });

  it("should return the correct href", () => {
    const builder = UrlBuilder().new();
    builder.protocol("https").domain("example.com").path("/test");
    assert.equal(builder.href, "https://example.com/test");
  });

  it("should return the correct JSON representation", () => {
    const builder = UrlBuilder().new();
    builder
      .protocol("https")
      .domain("example.com")
      .path("/test")
      .param("key", "value")
      .hash("section");
    assert.deepEqual(builder.toJSON(), {
      protocol: "https",
      username: "",
      password: "",
      hostname: "example.com",
      port: "",
      pathname: "/test",
      search: "key=value",
      hash: "#section",
    });
  });

  it("should return a URL object", () => {
    const builder = UrlBuilder().new();
    const url = builder
      .protocol("https")
      .domain("example.com")
      .path("/test")
      .toURL();
    assert.ok(url instanceof URL);
    assert.equal(url.href, "https://example.com/test");
  });
});
