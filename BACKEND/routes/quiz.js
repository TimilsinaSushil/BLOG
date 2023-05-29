const express = require("express");
const router = express.Router();
const { checkAuth, isAdmin } = require("../middlewares/checkAuth");
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

router.post("/", checkAuth, isAdmin, createQuiz);

router.put("/:id", checkAuth, isAdmin, updateQuiz);

router.delete("/:id", checkAuth, isAdmin, deleteQuiz);

router.get("/category", getQuizCategory);

router.post("/category", checkAuth, isAdmin, createQuizCategory);

router.put("/category/:id", checkAuth, isAdmin, updateQuizCategory);

router.delete("/category/:id", checkAuth, isAdmin, deleteQuizCategory);

module.exports = router;
