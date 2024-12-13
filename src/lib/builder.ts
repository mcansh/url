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
  | "origin"
>;

export function UrlBuilder() {
  let url: MinimalUrl = {
    protocol: "",
    username: "",
    password: "",
    hostname: "",
    port: "",
    pathname: "",
    hash: "",
    searchParams: new URLSearchParams(),
    host: "",
    origin: "",
  };

  function buildUrl() {
    let result = "";

    url.protocol ||= "https";
    result += url.protocol + "://";

    if (url.username) {
      result += url.username;
      if (url.password) result += `:${url.password}`;
      result += "@";
    }

    if (url.hostname) result += url.hostname;
    if (url.port) result += `:${url.port}`;

    result += url.pathname ||= "/";

    if (url.searchParams.size) {
      result += `?${url.searchParams.toString()}`;
    }

    if (url.hash) result += `#${url.hash}`;

    return result;
  }

  return {
    new() {
      return {
        build() {
          return buildUrl();
        },
        toString() {
          return buildUrl();
        },
        get href() {
          return buildUrl();
        },
        toJSON() {
          return {
            protocol: url.protocol,
            username: url.username,
            password: url.password,
            hostname: url.hostname,
            port: url.port,
            pathname: url.pathname,
            search: url.searchParams.toString(),
            hash: url.hash ? `#${url.hash}` : "",
          };
        },
        toURL() {
          return new URL(buildUrl());
        },
        get search() {
          return url.searchParams.toString();
        },
        param<T = string>(key: string, value: T) {
          if (value === null || typeof value == "undefined") return this;
          let valueAsString = value.toString();
          if (valueAsString) url.searchParams.set(key, valueAsString);
          return this;
        },
        path(pathname: string) {
          if (pathname.includes("?")) {
            pathname = pathname.split("?")[0] || "/";
          }
          if (!pathname.startsWith("/")) pathname = "/" + pathname;
          if (pathname.endsWith("/")) pathname = pathname.slice(0, -1);
          url.pathname = pathname;
          return this;
        },
        protocol(protocol: string) {
          url.protocol = protocol;
          return this;
        },
        username(username: string) {
          url.username = username;
          return this;
        },
        password(password: string) {
          url.password = password;
          return this;
        },
        domain(domain: string) {
          if (domain.includes("://")) {
            let [protocol, rest] = domain.split("://");
            if (!protocol || !rest) throw new Error("Invalid URL");
            this.protocol(protocol);
            domain = rest;
          }
          url.hostname = domain;
          return this;
        },
        port(port: number | string) {
          url.port = String(port);
          return this;
        },
        hash(hash: string) {
          url.hash = hash;
          return this;
        },
      };
    },
  };
}
