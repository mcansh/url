export function url(
  strings: TemplateStringsArray,
  ...values: Array<string | undefined | null>
) {
  let result = "";

  strings.forEach((string, index) => {
    let value = values[index];
    let trimmed = value?.trim();
    if (trimmed === "" || trimmed === null || trimmed === undefined) {
      return;
    }

    result += string + encodeURIComponent(trimmed);
  });

  return result;
}
