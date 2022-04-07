const mongoose = require("mongoose");
const { Schema } = mongoose;

const communitySchema = mongoose.Schema({
  habit: { type: String, required: true },
  goal: { type: String, required: true },
  startDate: { type: Date, required: true },
  targetPerDay: { type: String, required: true },
  daysSucceeded: { type: Number },
  daysFailed: { type: Number },
});

const CommunityData = mongoose.model("CommunityData", communitySchema);

module.exports = CommunityData;
