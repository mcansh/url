export function urlString(
  strings: TemplateStringsArray | string,
  ...values: Array<unknown>
): string {
  return url(strings, ...values).toString();
}

export function url(
  strings: TemplateStringsArray | string,
  ...values: Array<unknown>
): URL {
  if (typeof strings === "string") {
    throw new TypeError(`function must be used as template string`);
  }

  let result = "";

  // build url
  strings.raw.forEach((string, index) => {
    let value = values[index];
    result += value ? string + value : string;
  });

  // validate url
  if (!URL.canParse(result)) {
    throw new TypeError(`Invalid URL: "${result}"`);
  }

  let url = new URL(result);
  let searchParams = new URLSearchParams();

  // loop over search params and add only if there is a value
  for (let [key, value] of url.searchParams.entries()) {
    if (value && !["null", "undefined"].includes(value)) {
      searchParams.set(key, value);
    }
  }

  url.search = searchParams.toString();

  return url;
}
