const errorHandler = require("../utils/errorHandler");
const Message = require("../models/message.model");
const {
  sendRequest,
  requestMessage,
  requestEvent,
} = require("../config/dialogflow.config");

module.exports = {
  saveRequestMessage: async (req, res) => {
    if (!req.user) {
      return res.status(401).send({ message: "Unauthorized" });
    }
    const requestData = requestMessage(req.body.message);
    const response = await sendRequest(requestData);
    const message = await Message.create({
      ...req.body,
      user: req.user._id,
      response: response[0].queryResult.fulfillmentText,
    });
    res.send({ message, user: req.user.username });
  },
  getMessage: async (req, res) => {
    if (!req.user) {
      return res.status(401).send({ message: "Unauthorized" });
    }
    console.log(req.user);
    const messages = await Message.find({
      $and: [{ user: req.user?._id }, { $gt: [{ $strLenCP: "$message" }, 1] }],
    })
      .sort({ createdAt: -1 })
      .limit(parseInt(req.query.limit) * 10);
    res.send(messages);
  },
  getMessageEvent: async (req, res) => {
    if (!req.user) {
      return res.status(401).send({ message: "Unauthorized" });
    }
    const requestData = requestEvent(req.body.event);
    const response = await sendRequest(requestData);
    const message = await Message.create({
      user: req.user._id,
      response: response[0].queryResult.fulfillmentText,
    });
    console.log(response);
    res.send({ message, user: req.user.username });
  },
};
