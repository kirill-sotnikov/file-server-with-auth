export const removeDuplicateInURL = (url: string) => {
  let result = "";
  let previousPart: string | null = null;

  for (const part of url.split("/")) {
    if (part === previousPart) {
      continue;
    }

    result = result + "/" + part;
    previousPart = part;
  }
  return result;
};
