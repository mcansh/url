type MinimalUrl = Pick<
  URL,
  | "protocol"
  | "username"
  | "password"
  | "hostname"
  | "port"
  | "pathname"
  | "hash"
  | "searchParams"
  | "host"
  | "href"
  | "origin"
>;

export class CreateUrlBuilder {
  #url: MinimalUrl = {
    protocol: "",
    username: "",
    password: "",
    hostname: "",
    port: "",
    pathname: "",
    hash: "",
    searchParams: new URLSearchParams(),
    host: "",
    href: "",
    origin: "",
  };

  #buildUrl() {
    let result = "";

    this.#url.protocol ||= "https:";
    result += this.#url.protocol + "//";

    if (this.#url.username) {
      result += this.#url.username;
      if (this.#url.password) result += `:${this.#url.password}`;
      result += "@";
    }

    if (this.#url.hostname) result += this.#url.hostname;
    if (this.#url.port) result += `:${this.#url.port}`;

    result += this.#url.pathname ||= "/";

    if (this.#url.searchParams.size) {
      result += `?${this.#url.searchParams.toString()}`;
    }

    if (this.#url.hash) result += `#${this.#url.hash}`;

    this.#url.href = result;
    return result;
  }

  toString() {
    return this.#buildUrl();
  }

  toJSON() {
    return {
      protocol: this.#url.protocol,
      username: this.#url.username,
      password: this.#url.password,
      hostname: this.#url.hostname,
      port: this.#url.port,
      pathname: this.#url.pathname,
      search: this.#url.searchParams.toString(),
      hash: this.#url.hash,
    };
  }

  toURL() {
    return new URL(this.#buildUrl());
  }

  get search() {
    return this.#url.searchParams.toString();
  }

  get href() {
    return this.#buildUrl();
  }

  build() {
    return this.#buildUrl();
  }

  domain(domain: string) {
    if (domain.includes("://")) {
      let [protocol, rest] = domain.split("://");
      if (!protocol || !rest) throw new Error("Invalid URL");
      this.protocol(protocol);
      domain = rest;
    }
    this.#url.hostname = domain;
    return this;
  }

  path(pathname: string) {
    if (pathname.includes("?")) {
      let [p, search] = pathname.split("?");
      if (p) pathname = p;
      if (search) {
        let searchParams = new URLSearchParams(search);
        for (let [key, val] of searchParams) {
          this.#url.searchParams.set(key, val);
        }
      }
    }
    if (!pathname.startsWith("/")) pathname = "/" + pathname;
    if (pathname.endsWith("/")) pathname = pathname.slice(0, -1);
    this.#url.pathname = pathname;
    return this;
  }

  param<T = string>(key: string, value: T) {
    if (value === null || typeof value == "undefined") return this;
    let valueAsString = value.toString();
    if (valueAsString) this.#url.searchParams.set(key, valueAsString);
    return this;
  }

  protocol(protocol: string) {
    this.#url.protocol = protocol;
    return this;
  }

  username(username: string) {
    this.#url.username = username;
    return this;
  }

  password(password: string) {
    this.#url.password = password;
    return this;
  }

  port(port: string) {
    this.#url.port = port;
    return this;
  }

  hash<T = string>(key: string, value: T) {
    if (typeof value == "undefined") return this;
    if (this.#url.hash) this.#url.hash += `&${key}=${value}`;
    else this.#url.hash = `${key}=${value}`;
    return this;
  }
}

export function UrlBuilder() {
  return new CreateUrlBuilder();
}
