const router = require("express").Router();

router.post("/", (req, res) => {
  res.send({ test: req.body });
});
router.use("/message", require("./routes/message.route"));
router.use("/user", require("./routes/user.route"));

module.exports = router;
