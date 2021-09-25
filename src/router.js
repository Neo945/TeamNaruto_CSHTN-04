const router = require("express").Router();
const path = require("path");

router.post("/", (req, res) => {
    res.send({ test: req.body });
});
router.use("/message", require("./routes/message.route"));
router.use("/user", require("./routes/user.route"));
console.log("wadfs ", __dirname);
router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "build/index.html"));
});
router.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "build/index.html"));
});
router.get("/register", (req, res) => {
    res.sendFile(path.join(__dirname, "build/index.html"));
});
module.exports = router;
