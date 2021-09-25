const express = require("express");
const cors = require("cors");
const cp = require("cookie-parser");
const app = express();
const path = require("path");

app.use(cp());
app.use(require("./middleware/auth.middleware"));
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
// app.use(express.static("build"));
app.use("/", express.static(path.join(__dirname, "build")));
app.use(express.json());
app.use(require("morgan")("dev"));
app.use("/api", require("./router"));

module.exports = app;
