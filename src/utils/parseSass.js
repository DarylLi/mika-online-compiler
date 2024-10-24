const sass = await import("https://jspm.dev/sass");

export const getCssfromSass = (sassStr) => {
  return new Promise((res, rej) => {
    try {
      const returnCode = sass.compileString(sassStr);
      res(returnCode?.css || "");
    } catch (error) {
      rej(error);
    }
  });
};
