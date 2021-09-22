const errorHandler = require("../utils/errorHandler");
const Message = require("../models/message.model");
const { sendRequest, request } = require("../config/dialogflow.config");

module.exports = {
  saveRequestMessage: async (req, res) => {
    const requestData = request(req.body.message, req.body.event);
    const response = await sendRequest(requestData);
    const message = await Message.create({
      ...req.body,
      user: req.user._id,
      response: response[0].queryResult.fulfillmentText,
    });
    res.send(message);
  },
};
