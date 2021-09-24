const express = require("express");
const cors = require("cors");
const cp = require("cookie-parser");
const app = express();

app.use(cp());
app.use(require("./middleware/auth.middleware"));
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.static("public"));
app.use(express.json());
app.use(require("morgan")("dev"));
app.use("/api", require("./router"));

module.exports = app;
