const express = require("express");
const router = express.Router();
const Review = require("../models/Review");

router.post("/", async (req, res) => {
  const getReview = {
    name: req.body.review.name,
    job: req.body.review.job,
    mail: req.body.review.mail,
    desc: req.body.review.desc,
    order: req.body.review.order,
  };
  try {
    const checkEmail = await Review.find({ mail: getReview.mail });
    if (checkEmail.length > 0) {
      res.json({ msg: "Review with this email already exists" });
    } else {
      const newReview = new Review({
        name: getReview.name,
        job: getReview.job,
        mail: getReview.mail,
        desc: getReview.desc,
        order: getReview.order,
        timeStamp: Date.now(),
      });
      const review = await newReview.save();
      res.json({ review });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/", async (req, res) => {
  const getReviews = await Review.find();
  res.json(getReviews);
});

module.exports = router;
