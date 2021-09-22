const dotenv = require("dotenv");
const path = require("path");
const Joi = require("joi");

dotenv.config({ path: path.join(__dirname, "/.env") });

const envSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().default("development").description("Environment"),
    PORT: Joi.number().default(3000).description("Port"),
    MONGO_URI: Joi.string().required().description("MongoDB atlas link"),
  })
  .unknown();

const { value: env, error: err } = envSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

if (err) throw new Error(`Config validation error: ${err.message}`);

module.exports = env;
