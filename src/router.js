const router = require("express").Router();

router.post("/", (req, res) => {
  res.send({ test: req.body });
});
router.use("/message", require("./routes/message.route"));

module.exports = router;
