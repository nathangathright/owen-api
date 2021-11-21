const unfurl = require("unfurl.js");

module.exports = async (req, res) => {
  let url = new URL(req.query.url);
  url.protocol = "https:";
  return res.send(await unfurl(url.href));
};
