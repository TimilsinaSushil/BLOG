const Quiz = require("../../models/quiz/quizSchema");

const getQuiz =  (req, res) => {
  const quiz = req.body;
  res.send(quiz);
};

const createQuiz = (req, res) => {
  const quiz = req.body;
  res.send(quiz);
};

const updateQuiz = (req, res) => {
  const quiz = req.body;
  res.send(quiz);
};

const deleteQuiz = (req, res) => {
  const quiz = req.body;
  res.send(quiz);
};



module.exports = {getQuiz, createQuiz, updateQuiz, deleteQuiz}