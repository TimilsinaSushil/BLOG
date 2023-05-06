const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const questionSchema = new Schema(
  {
    query: String,
    answer: String,
  },
  { timestamps: true }
);

const Question = mongoose.model("Query", questionSchema);

module.exports = Question;
