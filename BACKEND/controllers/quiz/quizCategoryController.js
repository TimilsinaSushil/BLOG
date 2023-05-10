const QuizCategory = require("../../models/quiz/quizCategorySchema");

const getQuizCategory = async (req, res) => {
  const query = req.query;
  if (query.id) {
    try {
      const quizCategory = await QuizCategory.findById(query.id).select("name");
      res.send(quizCategory);
    } catch (e) {
      res.send(e.message);
    }
  } else {
    try {
      const quizCategories = await QuizCategory.find().select("name");
      console.log(quizCategories);

      res.send(quizCategories);
    } catch (e) {
      res.send(e.message);
    }
  }
};

const createQuizCategory = async (req, res) => {
  const quizCategory = req.body;
  try {
    const category = await QuizCategory.create(quizCategory);
    res.send({
      msg: "Quiz category created successfully.",
      quizCategory: category,
    });
  } catch (e) {
    res.send(e.message);
  }
};

const updateQuizCategory = async (req, res) => {
  try {
    const quizCategory = await QuizCategory.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    ).select("name");
    res.send({
      msg: "Quiz category updated sucessfully",
      quizCategory,
    });
  } catch (e) {
    res.send(e.message);
  }
};

const deleteQuizCategory = async (req, res) => {
  try {
    const quizCategory = await QuizCategory.findByIdAndDelete(
      req.params.id
    );
    res.send({
      msg: "Quiz category deleted sucessfully",
    });
  } catch (e) {
    res.send(e.message);
  }
};

module.exports = {
  getQuizCategory,
  createQuizCategory,
  updateQuizCategory,
  deleteQuizCategory,
};
