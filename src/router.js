const router = require("express").Router();

router.post("/", (req, res) => {
  res.send({ test: req.body });
});

module.exports = router;
