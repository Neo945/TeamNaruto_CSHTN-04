const mongoose = require("mongoose");
const { Schema } = mongoose;

const messageSchema = new Schema(
  {
    message: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 1000,
    },
    respose: {
      type: String,
      trim: true,
      minlength: 1,
      maxlength: 1000,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      validate: {
        validator: (userId) => {
          return mongoose.Types.ObjectId.isValid(userId);
        },
        message: "User is not valid",
      },
    },
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;
