const ogs = require("open-graph-scraper");

export default async (req, res) => {
  const options = { url: req.query.url };
  ogs(options).then((data) => {
    const { error, result } = data;
    const { twitterPlayer } = result;
    const hasTwitterPlayer = (twitterPlayer !== undefined);
    if (!error) {
      res.status(200).json({ 
        hasTwitterPlayer,
        "twitterPlayer" : twitterPlayer
      });
    } else {
      res.status(500).json({ error: error });      
    }
  });
};
