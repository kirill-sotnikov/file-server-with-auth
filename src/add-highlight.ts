export const addHighlight = (fileName: string, content: string) => {
  const fileType = fileName.match(/\..*$/i)?.[0];

  if (fileType && fileType) {
    try {
      return content;
    } catch (error) {
      console.error(error);
      return content;
    }
  }

  return content;
};
