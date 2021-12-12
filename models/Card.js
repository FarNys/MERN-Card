const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CardSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  extra: {
    type: String,
  },
  extra2: {
    type: String,
  },
  isWishList: {
    type: Boolean,
    // default: false,
  },
  fields: {
    type: Array,
  },
  mytimestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("allcards", CardSchema);
