const express = require("express");
const router = express.Router();
const Card = require("../models/Card");
const User = require("../models/User");

router.get("/", async (req, res) => {
  try {
    const cards = await Card.find();

    res.json(cards);
  } catch (error) {
    res.send("Server is Probleming!@!");
  }
});
router.get("/users", async (req, res) => {
  try {
    const users = await User.find();

    res.json(users);
  } catch (error) {
    res.send("Server is users");
  }
});
module.exports = router;
