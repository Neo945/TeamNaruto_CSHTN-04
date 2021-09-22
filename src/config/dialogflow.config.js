const dialogflow = require("dialogflow");

const env = require("./config");

const projectId = env.project_id;
const sessionId = env.dialogFlowSessionID;
const languageCode = env.dialogFlowSessionLanguageCode;

const sessionClient = new dialogflow.SessionsClient();
const sessionPath = sessionClient.sessionPath(projectId, sessionId);

const request = (text, event) => ({
  session: sessionPath,
  queryInput: {
    text: {
      text: text,
      languageCode: languageCode,
    },
    event: {
      languageCode: languageCode,
      name: event,
    },
  },
});
const sendRequest = async (request) => {
  const responses = await sessionClient.detectIntent(request);
  console.log("Detected intent");
  const result = responses[0].queryResult;
  console.log(`  Query: ${result.queryText}`);
  console.log(`  Response: ${result.fulfillmentText}`);
  return responses;
};

module.exports = {
  sendRequest,
  request,
};
