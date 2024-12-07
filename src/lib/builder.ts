type URL = {
  hash: string;
  host: string;
  hostname: string;
  href: string;
  origin: string;
  password: string;
  pathname: string;
  port: string;
  protocol: string;
  search: string;
  username: string;
  searchParams: URLSearchParams;
};

export function UrlBuilder() {
  let url: URL = {
    protocol: "https:",
    username: "",
    password: "",
    hostname: "",
    port: "",
    pathname: "/",
    hash: "",
    searchParams: new URLSearchParams(),
    host: "",
    href: "",
    origin: "",
    search: "",
  };

  return {
    toString() {
      let result = url.protocol.endsWith("//")
        ? url.protocol
        : url.protocol + "//";

      if (url.username) {
        result += url.username;
        if (url.password) {
          result += `:${url.password}`;
        }
        result += "@";
      }

      if (url.hostname) {
        result += url.hostname;
      }

      if (url.port) {
        result += `:${url.port}`;
      }

      if (url.pathname) {
        result += url.pathname;
      }

      if (url.searchParams.size) {
        result += `?${url.searchParams.toString()}`;
      }

      if (url.hash) {
        result += `#${url.hash}`;
      }

      url.href = result;

      return url.href;
    },
    toJSON() {
      return {
        protocol: url.protocol,
        username: url.username,
        password: url.password,
        hostname: url.hostname,
        port: url.port,
        pathname: url.pathname,
        searchParams: Object.fromEntries(url.searchParams),
        hash: url.hash,
      };
    },
    toURL() {
      return new URL(this.toString());
    },
    get href() {
      return this.toString();
    },
    build() {
      url.href = this.toString();
      return url.href;
    },
    domain(domain: string) {
      url.hostname = domain;
      return this;
    },
    path(pathname: string) {
      if (!pathname.startsWith("/")) {
        pathname = "/" + pathname;
      }
      if (pathname.includes("?")) {
        pathname = pathname.slice(0, pathname.indexOf("?"));
      }
      url.pathname = pathname;
      return this;
    },
    param<Type = string>(key: string, value?: Type) {
      let valueAsString = value?.toString();
      if (valueAsString) {
        url.searchParams.set(key, valueAsString);
      }
      return this;
    },
    protocol(protocol: string) {
      url.protocol = protocol.endsWith("://") ? protocol : protocol + "://";
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
    port(port: string) {
      url.port = port;
      return this;
    },
    hash(hash: string) {
      url.hash = hash;
      return this;
    },
  };
}
