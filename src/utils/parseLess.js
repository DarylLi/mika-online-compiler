import postcss from "postcss";
import less from "less";
import discardComments from "postcss-discard-comments";
import discardEmpty from "postcss-discard-empty";
import discardDuplicates from "postcss-discard-duplicates";

export const getCssFromLess = async (lessStr) => {
  return new Promise((res, rej) => {
    try {
      less.render(lessStr, async (err, result) => {
        if (err) throw err;
        else {
          const output = await postcss([
            discardComments,
            discardEmpty,
            discardDuplicates,
          ]).process(result.css, { from: undefined });
          res(output.css);
        }
      });
    } catch (error) {
      rej(error);
    }
  });
};
