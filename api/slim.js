const got = require("got")
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

export default async (req, res) => {
  const targetURL = new URL(req.query.url)
  const response = await got(targetURL)
  const { document } = (new JSDOM(response.body)).window;

  const getOembedUrl = () => 
    document.querySelector('link[type="application/json+oembed"]').getAttribute('href') || 
    document.querySelector('link[type="text/xml+oembed"]').getAttribute('href') || ''
  const playerUrl = () => 
    document.querySelector('meta[name="twitter:player"]').getAttribute('content') || 
    document.querySelector('meta[property="twitter:player"]').getAttribute('content') || ''
  const playerStream = () => 
    document.querySelector('meta[name="twitter:player:stream"]').getAttribute('content') || 
    document.querySelector('meta[property="twitter:player:stream"]').getAttribute('content') || ''
  const playerWidth = () => 
    document.querySelector('meta[name="twitter:player:width"]').getAttribute('content') || 
    document.querySelector('meta[property="twitter:player:width"]').getAttribute('content') || ''
  const playerHeight = () => 
    document.querySelector('meta[name="twitter:player:height"]').getAttribute('content') || 
    document.querySelector('meta[property="twitter:player:height"]').getAttribute('content') || ''

  const twitterPlayer = {
    url: playerUrl(),
    stream: playerStream(),
    width: playerWidth(),
    height: playerHeight()
  }

  res.status(200).json(twitterPlayer)
}
