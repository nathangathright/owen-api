const got = require("got")
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

export default async (req, res) => {
  const targetURL = new URL(req.query.url)
  const response = await got(targetURL)
  const dom = new JSDOM(response.body);

  const getOembedUrl = () => 
    dom.window.document.querySelector('link[type="application/json+oembed"]').getAttribute('href') || 
    dom.window.document.querySelector('link[type="text/xml+oembed"]').getAttribute('href')
  const playerUrl = () => 
    dom.window.document.querySelector('meta[name="twitter:player"]').getAttribute('content') || 
    dom.window.document.querySelector('meta[property="twitter:player"]').getAttribute('content')
  const playerStream = () => 
    dom.window.document.querySelector('meta[name="twitter:player:stream"]').getAttribute('content') || 
    dom.window.document.querySelector('meta[property="twitter:player:stream"]').getAttribute('content')
  const playerWidth = () => 
    dom.window.document.querySelector('meta[name="twitter:player:width"]').getAttribute('content') || 
    dom.window.document.querySelector('meta[property="twitter:player:width"]').getAttribute('content')
  const playerHeight = () => 
    dom.window.document.querySelector('meta[name="twitter:player:height"]').getAttribute('content') || 
    dom.window.document.querySelector('meta[property="twitter:player:height"]').getAttribute('content')

  const twitterPlayer = {
    url: playerUrl(),
    stream: playerStream(),
    width: playerWidth(),
    height: playerHeight()
  }

  res.status(200).json(twitterPlayer)
}
