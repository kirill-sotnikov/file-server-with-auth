import fs from "fs";
import { Fail, Ok, Result } from "./result";

export const getFileListInDir = (path: string) =>
  new Promise<Result<Array<string>, NodeJS.ErrnoException>>((resolve) => {
    fs.readdir(path, (error, files) => {
      if (error) {
        resolve(Fail(error));
      }

      resolve(Ok(files));
    });
  });
