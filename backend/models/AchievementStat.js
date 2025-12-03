const mongoose = require("mongoose");

const streakSchema = new mongoose.Schema(
  {
    current: { type: Number, default: 0 },
    best: { type: Number, default: 0 },
  },
  { _id: false }
);

const achievementStatSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    totalDone: { type: Number, default: 0 },
    streak: { type: streakSchema, default: () => ({}) },
    lastComputedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AchievementStat", achievementStatSchema);
