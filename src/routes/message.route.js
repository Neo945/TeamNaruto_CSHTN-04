const router = require("express").Router();
const Message = require("../models/message.model");
const controller = require("../controllers/message.controller");

router.post("/", controller.saveRequestMessage);

module.exports = router;
