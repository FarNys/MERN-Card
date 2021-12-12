const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");
const auth = require("../middleware/auth");

const Card = require("../models/Card");
const User = require("../models/User");

// @route    GET api/contacts
// @desc     Get all contacts
// @access   Private
router.get("/", auth, async (req, res) => {
  try {
    const cards = await Card.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(cards);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    POST api/contacts
// @desc     Create a contact
// @access   Private
router.post(
  "/",
  [
    auth,
    [
      check("title", "Name is required").not().isEmpty(),
      // check("type", "Type must be personal or professional").isIn([
      //   "personal",
      //   "professional",
      // ]),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, image, extra, extra2, fields, isWishList } =
      req.body;

    try {
      const newCard = new Card({
        title,
        description,
        image,
        extra,
        extra2,
        user: req.user.id,
        fields,
        isWishList,
      });
      console.log(newCard);

      const card = await newCard.save();

      res.json(card);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route    PUT api/contacts/:id
// @desc     Update a contact
// @access   Private
// router.put("/:id", auth, async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty())
//     return res.status(400).json({ errors: errors.array() });

//   const { isWishList } = req.body;
//   console.log(req.body);
//   // Build contact object
//   const cardField = {};
//   if (isWishList)
//     try {
//       let card = await Card.findById(req.params.id);

//       if (!card) return res.status(404).json({ msg: "Contact not found" });

//       // Make sure user owns contact
//       if (card.user.toString() !== req.user.id)
//         return res.status(401).json({ msg: "Not authorized" });

//       card = await Card.findByIdAndUpdate(
//         req.params.id,
//         { $set: contactFields },
//         { new: true }
//       );

//       res.json(card);
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).send("Server error");
//     }
// });

// @route    DELETE api/contacts/:id
// @desc     Delete a contact
// @access   Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);
    console.log(card.user);
    if (!card) return res.status(404).json({ msg: "Card not found" });

    // Make sure user owns contact
    if (card.user.toString() !== req.user.id)
      return res.status(401).json({ msg: "Not authorized" });

    await Card.findByIdAndRemove(req.params.id);
    console.log(card);
    res.json(card);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});
router.patch("/:id", auth, async (req, res) => {
  const id = req.params.id;
  Card.findById(id, (err, card) => {
    if (!card) {
      res.status(404).send("Not FoUnd");
    } else {
      card.isWishList = !card.isWishList;
      card
        .save()
        .then((el) => {
          res.json(el);
        })
        .catch((err) => res.status(500).send(err.message));
    }
  });
});

router.get("/:id", auth, async (req, res) => {
  const id = req.params.id;
  Card.findById(id, (err, card) => {
    if (!card) {
      res.status(404).send("Card Not Found");
    } else {
      res.json(card);
      console.log(id);
    }
  });
});

router.patch("/edit/:id", auth, async (req, res) => {
  const id = req.params.id;
  const { title, description, image, extra, extra2, isWishList } = req.body;
  const cardFields = {};
  if (title) cardFields.title = title;
  if (description) cardFields.description = description;
  if (image) cardFields.image = image;
  if (extra) cardFields.extra = extra;
  if (extra2) cardFields.extra2 = extra2;
  cardFields.isWishList = isWishList;
  try {
    const card = await Card.findByIdAndUpdate(
      id,
      { $set: cardFields },
      { new: true }
    );
    res.status(200).json(card);
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

module.exports = router;
