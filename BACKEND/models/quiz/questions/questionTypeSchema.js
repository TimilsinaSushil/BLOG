const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questionTypeSchema = new Schema({
  name: {
    type: String,
    required: true,
    minLength: [3, "Question type name must be at least 3 character long"],
  },
});

const QuestionType = mongoose.model("QuestionType", questionTypeSchema);

module.exports = QuestionType;
