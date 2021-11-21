const got = require("got");
const metascraper = require("metascraper")([
  require("metascraper-iframe")(),
]);

export default async (req, res) => {
    let targetUrl = new URL(req.query.url);
    const { body: html, url } = await got(targetUrl);
    const metadata = await metascraper({ html, url });
    console.log(metadata);
    res.json(metadata);
}
