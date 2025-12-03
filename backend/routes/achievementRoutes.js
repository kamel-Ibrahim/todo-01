const express = require("express");
const router = express.Router();

const AchievementStat = require("../models/AchievementStat"); 
const Task = require("../models/Task"); 

function toDateKey(ts) {
  const d = typeof ts === "number" ? new Date(ts) : new Date(ts ?? Date.now());
  if (isNaN(d.getTime())) return null;
  d.setHours(0, 0, 0, 0);
  return d.toISOString().slice(0, 10);
}

function computeStreak(dateKeys) {
  if (!dateKeys || dateKeys.size === 0) return { current: 0, best: 0 };
  const dayMs = 24 * 60 * 60 * 1000;
  const days = Array.from(dateKeys).sort();
  let best = 1;
  let run = 1;
  for (let i = 1; i < days.length; i++) {
    const diff = (new Date(days[i]) - new Date(days[i - 1])) / dayMs;
    if (diff === 1) {
      run++;
      best = Math.max(best, run);
    } else if (diff > 1) {
      run = 1;
    }
  }
  return { current: run, best };
}

router.get("/me", async (req, res) => {
  try {

    const userId = req.user?.id || req.user?._id || req.userId;

    if (!userId) {
      console.error("No userId found on request in /api/achievements/me");
      return res.status(401).json({ message: "Not authorized" });
    }

    const completedTasks = await Task.find({
      user: userId,
      $or: [{ done: true }, { status: "done" }],
    }).lean();

    const totalDone = completedTasks.length;

    const dates = new Set(
      completedTasks
        .map((t) =>
          toDateKey(t.completedAt || t.updatedAt || t.createdAt)
        )
        .filter(Boolean)
    );

    const streak = computeStreak(dates);

    const stats = await AchievementStat.findOneAndUpdate(
      { user: userId },
      {
        totalDone,
        streak,
        lastComputedAt: new Date(),
      },
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
      }
    ).lean();


    return res.json({
      totalDone: stats.totalDone,
      streak: stats.streak,
    });
  } catch (err) {
    console.error("Error in GET /api/achievements/me:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
