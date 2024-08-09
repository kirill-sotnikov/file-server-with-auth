import { ListOptionsHtmlFormat } from "@fastify/static";

const getHtml = (body: string) => {
  return `
<html>
<meta http-equiv='Content-Type' content='text/html; charset=utf-8'>
<body style="font-family:sans-serif;">
${body}
</body></html>
`;
};

const renderList = <T extends { href: string; name: string }>(
  list: Array<T>,
  emoji: string,
  openInNewTab: boolean = false
) => {
  return [
    `<ul style="list-style: none;margin-top:30;">`,
    list
      .map(
        (file) =>
          `<li style="margin-top:5"><a href="${file.href}" ${
            openInNewTab ? 'target="_blank"' : ""
          }>${emoji} ${file.name}</a></li>`
      )
      .join("\n  "),
    "</ul>",
  ].join("\n");
};

export const renderMenu: ListOptionsHtmlFormat["render"] = (dirs, files) => {
  const body = renderList(dirs, "🗂️") + renderList(files, "📄", true);

  return getHtml(body);
};
