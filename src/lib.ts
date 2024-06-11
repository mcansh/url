export function url(
  strings: TemplateStringsArray,
  ...values: Array<string | undefined | null>
) {
  let result = "";

  // build url
  strings.forEach((string, index) => {
    let value = values[index];
    result += value ? string + value : string;
  });

  if (!URL.canParse(result)) {
    throw new TypeError(`Invalid URL: "${result}"`);
  }
  // validate url
  let u = new URL(result);
  let sp = new URLSearchParams();

  // loop over search params and add only if there is a value
  for (let [key, value] of u.searchParams.entries()) {
    if (value) sp.set(key, value);
  }

  // update search params
  u.search = sp.toString();

  return u.toString();
}
