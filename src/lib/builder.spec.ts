import * as assert from "node:assert/strict";
import { describe, test } from "node:test";
import { UrlBuilder } from "./builder.ts";

describe("UrlBuilder", () => {
  test("can set domain", () => {
    let url = UrlBuilder().domain("example.com");
    assert.equal(url.toURL().hostname, "example.com");
    assert.equal(url.build(), "https://example.com/");
  });

  test("can set path", () => {
    let assertion = "https://example.com/path";
    assert.equal(
      UrlBuilder().domain("example.com").path("/path").build(),
      assertion,
    );
    assert.equal(
      UrlBuilder().domain("example.com").path("path").build(),
      assertion,
    );
    assert.equal(
      UrlBuilder().domain("example.com").path("/path/").build(),
      assertion,
    );
  });

  test("can set searchParams", () => {
    let url = UrlBuilder().domain("example.com").param("q", "my search");
    assert.equal(url.toURL().searchParams.get("q"), "my search");
    assert.equal(url.build(), "https://example.com/?q=my+search");
  });

  test("can set searchParams that's not a string", () => {
    let url = UrlBuilder()
      .domain("example.com")
      .param<number>("userId", 5)
      .param("filter", "category");

    assert.equal(url.toURL().searchParams.get("userId"), "5");
    assert.equal(url.toURL().searchParams.get("filter"), "category");

    assert.equal(url.build(), "https://example.com/?userId=5&filter=category");
  });

  test("builders", () => {
    let instance = UrlBuilder()
      .domain("site.com")
      .param("q", "my search")
      .param<number>("userId", 5)
      .param<string>("filter", "category");

    let assertion = "https://site.com/?q=my+search&userId=5&filter=category";

    let url = instance.toURL();
    let json = instance.toJSON();
    let href = instance.href;
    let string = instance.toString();

    assert.ok(url instanceof URL);
    assert.ok(typeof href === "string");
    assert.ok(typeof string === "string");
    assert.ok(typeof json === "object");
    assert.equal(href, assertion);
    assert.equal(string, assertion);
    assert.deepEqual(json, {
      protocol: "https:",
      username: "",
      password: "",
      hostname: "site.com",
      port: "",
      pathname: "/",
      search: "q=my+search&userId=5&filter=category",
      hash: "",
    });
  });
});
