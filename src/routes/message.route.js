const router = require("express").Router();
const Message = require("../models/message.model");
const controller = require("../controllers/message.controller");

router.post("/send", controller.saveRequestMessage);
router.get("/get", controller.getMessage);
router.post("/event", controller.getMessageEvent);

module.exports = router;
