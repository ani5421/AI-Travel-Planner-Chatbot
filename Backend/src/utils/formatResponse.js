// Clean and format AI response
const formatResponse = (text) => {
  if (!text) return "";

  return text
    .replace(/\n/g, "<br>")   // new line → HTML
    .trim();
};

module.exports = formatResponse;