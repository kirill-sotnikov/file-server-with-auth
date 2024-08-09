import fs from "fs";
import { Fail, Ok, Result } from "./result";

export const readFile = (path: string) =>
  new Promise<Result<Buffer, NodeJS.ErrnoException>>((resolve) => {
    fs.readFile(path, (error, data) => {
      if (error) {
        resolve(Fail(error));
      }
      resolve(Ok(data));
    });
  });
