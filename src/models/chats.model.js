const mongoose = require("mongoose");

const chatsSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
  },
  messages: [
    {
      text: { type: String, required: true, trim: true },
      person: { type: String, required: true, trim: true },
      lineNumber: { type: Number },
      createdAt: { type: Date, default: Date.now },
      _id: false,
    },
  ],
});

chatsSchema.index({ username: 1 }, { unique: true });

const Chats = mongoose.model("Chats", chatsSchema);

module.exports = Chats;
