const express = require("express");
const router = express.Router();
const checkAuth = require("../middlewares/checkAuth");
const {
  getQuiz,
  createQuiz,
  updateQuiz,
  deleteQuiz,
} = require("../controllers/quiz/quizController");

const {
  getQuizCategory,
  createQuizCategory,
  updateQuizCategory,
  deleteQuizCategory,
} = require("../controllers/quiz/quizCategoryController");

router.get("/", getQuiz);

router.post("/", checkAuth, createQuiz);

router.put("/:id", checkAuth, updateQuiz);

router.delete("/:id", checkAuth, deleteQuiz);

router.get("/category", getQuizCategory);

router.post("/category", checkAuth, createQuizCategory);

router.put("/category/:id", checkAuth, updateQuizCategory);

router.delete("/category/:id", checkAuth, deleteQuizCategory);

module.exports = router;
