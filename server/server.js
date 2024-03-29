const express = require("express");
const path = require("path");

const articles = require("./controllers/articles");
const videos = require("./controllers/videos");
const app = express();

app.use(express.static("dist"));
app.use("/api/getarticles", articles);
app.use("/api/getvideos", videos);
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

const port = process.env.PORT || 8080;
app.listen(port);
console.log("start with: " + port);
