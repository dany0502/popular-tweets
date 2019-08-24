const client = require("../twitter");

const request = q => {
  return new Promise((resolve, reject) => {
    const params = { q, result_type: "mixed", count: 50 };
    client.get("search/tweets", params, (error, tweets) => {
      if (!error) {
        resolve(tweets.statuses);
      } else {
        reject(error);
      }
    });
  });
};

const getLineNewsTweets = () => {
  const query = "#linenews min_faves:100";
  return request(query);
};

const getNewsPicksTweets = () => {
  const query = "#NewsPicks min_faves:100";
  return request(query);
};

const getSmartNewsTweets = () => {
  const query = "#SmartNews min_faves:100";
  return request(query);
};

module.exports = (req, res) => {
  // Get articles from LINE News, News Picks and Smart News.
  // Sort tweets by favorit counts and retwwets counts.
  // Finnaly return top 100 tweets to the client.
  Promise.all([getLineNewsTweets(), getNewsPicksTweets(), getSmartNewsTweets()])
    .then(statuses => {
      const tweets = [...statuses[0], ...statuses[1], ...statuses[2]];
      const sortedTweets = tweets
        .sort((a, b) => {
          return a.favorite_count + a.retweet_count >
            b.favorite_count + b.retweet_count
            ? -1
            : 1;
        })
        .slice(0, 100);
      res.status(200).send(sortedTweets);
    })
    .catch(error => {
      res.status(500).send(error);
    });
};
