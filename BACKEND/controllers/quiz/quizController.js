const Quiz = require("../../models/quiz/quizSchema");

const getQuiz = async (req, res) => {
  try {
    if (req.query.id) {
      const quiz = await Quiz.findById(req.query.id).populate(
        "category",
        "name"
      );
      res.send(quiz);
    } else {
      const quizzes = await Quiz.find().populate("category", "name");
      res.send(quizzes);
    }
  } catch (e) {
    res.send(e.message);
  }
};

const createQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.create(req.body);
    res.send({
      msg: "Quiz created successfully.",
      quiz,
    });
  } catch (e) {
    res.send(e.message);
  }
};

const updateQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    ).populate("category", "name");
    res.send({
      msg: "Quiz updated successfully",
      quiz,
    });
  } catch (e) {
    res.send(e.message);
  }
};

const deleteQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndDelete(req.params.id);
    res.send({
      msg: "Quiz deleted sucessfully",
    });
  } catch (e) {
    res.send(e.message);
  }
};

module.exports = { getQuiz, createQuiz, updateQuiz, deleteQuiz };
