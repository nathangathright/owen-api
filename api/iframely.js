const request = require('request')

export default function handler(req, res) {
  const url = new URL(req.query.url);
  const key = req.query.api_key;
  
  //if key is not provided, return error
  !key && res.status(401).send('API key is required');
  
  request(
    {
      url: `https://iframe.ly/api/oembed?url=${url}?amp=1&api_key=${key}`,
      method: "GET"
    },
    (err, response, body) => {
      if (err) {
        console.log(err);
        res.end("Error");
      } else {
        res.json(JSON.parse(body).html);
      }
    }
  );
}
