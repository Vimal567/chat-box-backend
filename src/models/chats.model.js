const mongoose = require("mongoose");

const chatsSchema = mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
    },
    message: [{
      text: String,
      person: String,
      line: Number
  },],
  }
);

const Chats = mongoose.model("Chats", chatsSchema);

module.exports.Chats = Chats;
