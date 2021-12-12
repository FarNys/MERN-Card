const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  name: {
    type: String,
  },
  job: {
    type: String,
  },
  mail: {
    type: String,
  },
  desc: {
    type: String,
  },
  order: {
    type: String,
  },
  timeStamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("allreviews", ReviewSchema);
