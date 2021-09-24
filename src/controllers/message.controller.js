const errorHandler = require("../utils/errorHandler");
const Message = require("../models/message.model");
const transporter = require("../config/mailer.config");

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
    const requestData = requestMessage(req.body.message,req.body.language);
    const response = await sendRequest(requestData);
    const message = await Message.create({
      ...req.body,
      user: req.user._id,
      response: response[0].queryResult.fulfillmentText,
    });
    if (
      response[0].queryResult.action === "fill.form" &&
      response[0].queryResult.allRequiredParamsPresent
    ) {
      const email = response[0].queryResult.parameters.fields.email.stringValue;
      const message = `<h1>Thank you for reaching out</h1>
                    <p>We will contact you soon!!</p>`;
      console.log(await transporter(email, "Chabot Feedback", message));
    }
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
    const requestData = requestEvent(req.body.event,req.body.language);
    const response = await sendRequest(requestData);

    const message = await Message.create({
      user: req.user._id,
      response: response[0].queryResult.fulfillmentText,
    });
    res.send({ message, user: req.user.username });
  },
};