const client = require("../twitter");

module.exports = (req, res) => {
  const q = encodeURIComponent("filter:video") + " min_faves:100";
  const params = { q, result_type: "mixed", count: 100 };
  client.get("search/tweets", params, (error, tweets) => {
    if (!error) {
      const sortedTweets = tweets.statuses.sort((a, b) => {
        return a.favorite_count + a.retweet_count >
          b.favorite_count + b.retweet_count
          ? -1
          : 1;
      });
      res.status(200).send(sortedTweets);
    } else {
      res.status(500).send(error);
    }
  });
};
