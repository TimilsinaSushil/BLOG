const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const quizSchema = new Schema({
  name: {
    type: String,
    required: true,
    minLength: [3, "Quiz name must be at least 3 character long"],
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  tags: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tag",
    },
  ],
});

const Quiz = mongoose.model("Quiz", quizSchema);

module.exports = Quiz;
