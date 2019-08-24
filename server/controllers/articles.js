const client = require("../twitter");
const FIVE_MINUTS = require("../constants");

let responseCache = { data: null, expireTime: null };

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
  const now = new Date().getTime();
  // Check expire time then return cached data.
  if (responseCache.expireTime !== null && now > responseCache.expireTime) {
    res.status(200).send(responseCache.data);
    return;
  }
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
      // Cache tweets for 5 minutes.
      responseCache.data = sortedTweets;
      responseCache.expireTime = new Date().getTime() + FIVE_MINUTS;
    })
    .catch(error => {
      res.status(500).send(error);
    });
};
