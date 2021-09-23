const errorHandler = require("../utils/errorHandler");
const Message = require("../models/message.model");
const {
  sendRequest,
  requestMessage,
  requestEvent,
} = require("../config/dialogflow.config");

module.exports = {
  saveRequestMessage: async (req, res) => {
    const requestData = requestMessage(req.body.message);
    const response = await sendRequest(requestData);
    const message = await Message.create({
      ...req.body,
      user: req.user._id,
      response: response[0].queryResult.fulfillmentText,
    });
    res.send({ message });
  },
  getMessage: async (req, res) => {
    const messages = await Message.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .limit(parseInt(req.query.limit) * 10);
    res.send(messages);
  },
  getMessageEvent: async (req, res) => {
    const requestData = requestEvent(req.body.event);
    console.log(requestData);
    const response = await sendRequest(requestData);
    res.send({ message: response[0].queryResult.fulfillmentText });
  },
};
