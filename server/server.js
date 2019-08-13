const express = require("express");
const articles = require("./controllers/articles");
const app = express();

app.use("/api/getarticles", articles);

const port = process.env.PORT || 8080;
app.listen(port);
console.log("start with: " + port);
