const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const answerSchema = new Schema({
  value: {
    type: String,
    required: true,
    minlength: [3, "answer must be at least 3 character long"],
  },
  correct: {
    type: Boolean,
    default: false,
    required: true
  }

});
