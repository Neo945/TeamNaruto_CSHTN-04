const mongoose = require("mongoose");
const env = require("./config/config");
const app = require("./index");

mongoose.connect(env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.once("open", (err) => {
  app.listen(env.PORT, () => {
    console.log(
      `Server running on port ${env.PORT}\n\tlink: http://localhost:${env.PORT}`
    );
  });
});
