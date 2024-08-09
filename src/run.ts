import basicAuth from "@fastify/basic-auth";
import fastify from "fastify";
import { addHighlight } from "./add-highlight";
import { getContentType } from "./get-content-type";
import { getFileListInDir } from "./get-files-in-dir";
import { getHtmlWithFileList } from "./get-html-with-list";
import { readFile } from "./read-file";
import { validate } from "./validate";

const PORT = Number(process.env.PORT) || 3000;

const app = fastify();
const authenticate = { realm: "Westeros" };

app.register(basicAuth, { validate, authenticate });

app.after(() => {
  app.addHook("onRequest", app.basicAuth);

  app.get("/*", async (request, response) => {
    const filePath = request.url === "/" ? "./" : request.url.slice(1);

    const fileContent = await readFile(filePath);

    if (fileContent.isSuccess) {
      response
        .type(getContentType(filePath))
        .send(addHighlight(filePath, fileContent.data.toString()));

      return;
    }

    if (fileContent.error.code === "EISDIR") {
      const filesInDirResult = await getFileListInDir(filePath);

      if (filesInDirResult.isSuccess) {
        response
          .type("text/html")
          .send(getHtmlWithFileList(filePath, filesInDirResult.data));

        return;
      } else {
        console.error(filesInDirResult.error);
      }
    }

    console.error(fileContent.error);

    response.send("File not found");
  });
});

app.listen({ port: PORT, host: "0.0.0.0" }, (error) => {
  if (error) {
    console.error(error);
    throw error;
  }

  console.log(`Server started on http://localhost:${PORT}`);
});
