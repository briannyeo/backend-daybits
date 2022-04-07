const mongoose = require("mongoose");
const { Schema } = mongoose;

const userDataSchema = mongoose.Schema({
  journalEntry: { type: String, required: true },
  journalDate: { type: Date, required: true },
  commenterUserId: { type: String, required: true },
  commenterComment: { type: String, required: true },
  commenterDate: { type: Date, required: true },
  journalLikes: { type: Number },
});

const UserData = mongoose.model("UserData", userDataSchema);

module.exports = UserData;
