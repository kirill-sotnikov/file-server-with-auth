import { removeDuplicateInURL } from "./remove-duplicate-in-url";

const style = {
  display: "block",
  "margin-top": 10,
  "border-radius": "7px",
  "font-family": "sans-serif",
};

const toHTMLStyle = (target: object) => {
  return Object.entries(target).reduce((prev, item) => {
    const [key, value] = item;
    return prev + `${String(key)}:${String(value)};`;
  }, "");
};

export const getHtmlWithFileList = (root: string, files: Array<string>) => {
  return files
    .map((item) => {
      const isDir = !item.match(/\..*$/i);
      const link = root + "/" + item;

      return `<a style="${toHTMLStyle(style)}" href="${removeDuplicateInURL(
        link
      )}">${isDir ? `${item}/` : item}</a>`;
    })
    .join("\n");
};
