type MinimalUrl = {
  protocol: string;
  username: string;
  password: string;
  domain: string;
  port: string;
  pathname: string;
  hash: string;
  searchParams: URLSearchParams;
};

class CreateUrlBuilder {
  #url: MinimalUrl = {
    protocol: "",
    username: "",
    password: "",
    domain: "",
    port: "",
    pathname: "",
    hash: "",
    searchParams: new URLSearchParams(),
  };

  #buildUrl() {
    let result = "";

    this.#url.protocol ||= "https";
    result += this.#url.protocol + "://";

    if (this.#url.username) {
      result += this.#url.username;
      if (this.#url.password) result += `:${this.#url.password}`;
      result += "@";
    }

    if (this.#url.domain) result += this.#url.domain;
    if (this.#url.port) result += `:${this.#url.port}`;

    // result += this.#url.pathname;

    let protocolsThatRequirePathname = [
      "http",
      "https",
      "https",
      "ftp",
      "ws",
      "wss",
      "file",
    ];

    result += this.#url.pathname;
    if (protocolsThatRequirePathname.includes(this.#url.protocol)) {
      if (!this.#url.pathname) result += "/";
    }

    if (this.#url.searchParams.size) {
      result += `?${this.#url.searchParams.toString()}`;
    }

    if (this.#url.hash) result += `#${this.#url.hash}`;

    return result;
  }

  param<T = string>(key: string, value: T) {
    if (value === null || typeof value == "undefined") return this;
    let valueAsString = value.toString();
    if (valueAsString) this.#url.searchParams.set(key, valueAsString);
    return this;
  }

  path(pathname: string) {
    if (pathname.includes("?")) {
      pathname = pathname.split("?")[0] || "";
    }
    if (!pathname.startsWith("/")) pathname = "/" + pathname;
    if (pathname.endsWith("/")) pathname = pathname.slice(0, -1);
    this.#url.pathname = pathname;
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

  domain(domain: string) {
    if (domain.includes("://")) {
      let [protocol, rest] = domain.split("://");
      if (!protocol || !rest) throw new Error("Invalid URL");
      this.protocol(protocol);
      domain = rest;
    }
    this.#url.domain = domain;
    return this;
  }

  port(port: number | string) {
    this.#url.port = String(port);
    return this;
  }

  hash(hash: string) {
    this.#url.hash = hash;
    return this;
  }

  build() {
    return this.#buildUrl();
  }

  toString() {
    return this.#buildUrl();
  }

  get href() {
    return this.#buildUrl();
  }

  toURL() {
    let url = this.#buildUrl();
    return new URL(url);
  }

  get search() {
    return this.#url.searchParams.toString();
  }
}

export function UrlBuilder() {
  return {
    new() {
      return new CreateUrlBuilder();
    },
  };
}
