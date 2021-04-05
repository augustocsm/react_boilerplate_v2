/**
 * Summarize Function.
 * Limit given text based in the number characteres.
 *
 * @param {str} str   Raw text
 * @param {Int} limit Character limit
 * @param {Int} counter Initial counter
 *
 * @returns {str} Summarized text
 */
const summarize = (str, limit, counter = 0) => {
  if (!str) {
    return null;
  }

  if (limit < str.length) {
    return (
      str
        .split(" ")
        .filter(x => {
          if ((counter += x.length) < limit) {
            return x;
          }
          return null;
        })
        .join(" ") + "..."
    );
  }

  return str;
};

export default summarize;
