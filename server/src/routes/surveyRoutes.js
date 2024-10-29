const express = require("express");
const router = express.Router();
const Survey = require("../models/Survey");

router.post("/save", async (req, res) => {
  try {
    const { questions } = req.body;
    const userId = req.user.uid;

    const survey = new Survey({
      userId,
      questions,
    });

    await survey.save();
    res.status(201).json(survey);
  } catch (error) {
    console.error("Save survey error:", error);
    res.status(500).json({ error: "Failed to save survey" });
  }
});

module.exports = router;
