export class UrlBuilder {
  #url: URL = new URL("https://example.com");

  toString() {
    return this.#url?.toString() ?? "";
  }

  get href() {
    return this.toString();
  }

  build() {
    return this.toString();
  }

  toURL() {
    return this.#url;
  }

  new() {
    return this;
  }

  domain(domain: string) {
    this.#url.hostname = domain;
    return this;
  }

  path(pathname: string) {
    this.#url.pathname = pathname;
    return this;
  }

  param<Type = string>(key: string, value?: Type) {
    let valueAsString = value?.toString();
    if (valueAsString) {
      this.#url.searchParams.set(key, valueAsString);
    }
    return this;
  }
}
