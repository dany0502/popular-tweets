const client = require("../twitter");

module.exports = (req, res) => {
  const q = encodeURIComponent("filter:video") + " min_faves:100";
  const params = { q, result_type: "mixed", count: 50 };
  client.get("search/tweets", params, (error, tweets) => {
    if (!error) {
      const sortedTweets = tweets.statuses
        .filter(tw => {
          return (
            (tw &&
              tw.extended_entities &&
              tw.extended_entities.media[0].video_info) ||
            false
          );
        })
        .sort((a, b) => {
          return a.favorite_count + a.retweet_count >
            b.favorite_count + b.retweet_count
            ? -1
            : 1;
        })
        .map(tw => {
          const videoInfo = tw.extended_entities.media[0].video_info;
          const variants = videoInfo.variants.filter(variant => {
            return variant.content_type === "video/mp4";
          });
          videoInfo.variants = variants;
          return tw;
        });
      res.status(200).send(sortedTweets);
    } else {
      res.status(500).send(error);
    }
  });
};
