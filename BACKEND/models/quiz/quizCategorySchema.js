const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const quizCategorySchema = new Schema({
  name: {
    type: String,
    required: true,
    minLength: [3, "Quiz category name must be at least 5 character long"],
  },
});

const QuizCategory = mongoose.model("QuizCategory", quizCategorySchema);

module.exports = QuizCategory;
