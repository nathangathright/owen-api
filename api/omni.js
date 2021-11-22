import oEmbed from "./oEmbed";

const got = require("got");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const metascraper = require("metascraper")([require("metascraper-iframe")()]);
const ogs = require("open-graph-scraper");

export default async (req, res) => {
  // get the url from the query string and parse it
  const targetURL = new URL(req.query.url);
  const key = req.query.api_key;
  const { html, url } = await got(targetURL);
  let hasOembed = true;
  let hasTwitterPlayer = true;

  // look for oEmbed iframe URL
  const metadata = await metascraper({ html, url });
  hasOembed = (metadata.iframe != null)
  hasOembed && res.status(200).json(metadata);

  // look for Twitter player meta tag
  ogs({ url, html }).then((data) => {
    const { error, result } = data;
    const { twitterPlayer } = result;
    error && res.status(500).json({ error: error });
    hasTwitterPlayer = (twitterPlayer !== undefined)
    hasTwitterPlayer && res.status(200).json({ twitterPlayer });
  });

  // no clue how to chain this function
  // if metadata.iframe is null and twitterPlayer is undefined, then we try iframely
  if (hasOembed || hasTwitterPlayer) {
    console.log("saved API requests by avoiding iframely");
  } else {
    !key && res.status(401).send('API key is required');
    try {
      console.log('this costs money');
      const { body } = await got(`https://iframe.ly/api/oembed?url=${url}?amp=1&api_key=${key}`);
      const dom = new JSDOM(JSON.parse(body).html);
      res.status(200).json({
        url: dom.window.document.querySelector('iframe').src,
        width: parseInt(dom.window.document.querySelector('*[style*="max-width"]').style.maxWidth, 10),
        height: parseInt(dom.window.document.querySelector('*[style*="height"]').style.height, 10),
      });
    } catch (error) {
      res.status(500).json({ error })
    }
  }
  res.status(204).end();
};
