const defaultContentType = "text/plain";

const contentTypeMap = {
  ".json": "application/json",
};

export const getContentType = (file: string) => {
  const fileExtension = file.match(/\..*$/i)?.[0];
  const contentType =
    fileExtension &&
    contentTypeMap[fileExtension as keyof typeof contentTypeMap];

  if (contentType) {
    return contentType;
  }

  return defaultContentType;
};
