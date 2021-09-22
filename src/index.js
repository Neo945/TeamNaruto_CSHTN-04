const express = require("express");
const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(require("morgan")("dev"));
app.use("/api", require("./router"));

module.exports = app;
