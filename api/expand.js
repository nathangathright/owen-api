const request = require('request')

export default function handler(req, res) {
  let url = new URL(req.query.url);
  url.protocol = "https:";
  request(
    {
      url: url,
      method: "HEAD",
      followAllRedirects: true,
    },
    (err, response, body) => {
      if (err) {
        console.log(err);
        res.end("Error");
      } else {
        res.send(response.request.href);
      }
    }
  );
}
