const dotenv = require("dotenv");
const key = require("./key.json");
const path = require("path");
const Joi = require("joi");

dotenv.config({ path: path.join(__dirname, "/.env") });

const envSchema = Joi.object()
  .keys({
    SECRET_KEY: Joi.string().required(),
    type: Joi.string().required(),
    project_id: Joi.string().required(),
    dialogFlowSessionID: Joi.string().default("bot-session"),
    private_key_id: Joi.string().required(),
    dialogFlowSessionLanguageCode: Joi.string().default("en-US"),
    private_key: Joi.string().required(),
    client_email: Joi.string().required(),
    client_id: Joi.string().required(),
    auth_uri: Joi.string().required(),
    token_uri: Joi.string().required(),
    auth_provider_x509_cert_url: Joi.string().required(),
    client_x509_cert_url: Joi.string().required(),
    NODE_ENV: Joi.string().default("development").description("Environment"),
    PORT: Joi.number().default(3000).description("Port"),
    MONGO_URI: Joi.string().required().description("MongoDB atlas link"),
  })
  .unknown();

const { value: env, error: err } = envSchema
  .prefs({ errors: { label: "key" } })
  .validate({ ...process.env, ...key });

if (err) throw new Error(`Config validation error: ${err.message}`);

module.exports = env;
