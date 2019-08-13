const client = require("../twitter");

module.exports = (req, res) => {
  const q = encodeURIComponent("min_faves:100");
  const params = { q, result_type: "mixed", count: 100 };
  client.get("search/tweets", params, (error, tweets) => {
    if (!error) {
      res.status(200).send(tweets.statuses);
    } else {
      res.status(500).send(error);
    }
  });
};
