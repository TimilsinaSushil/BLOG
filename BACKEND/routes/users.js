const express = require("express");
const { signup, login, logout } = require("../controllers/user/userController");

const User = require("../models/user/userSchema");
const router = express.Router();
const checkAuth = require("../middlewares/checkAuth");

//signup
router.post("/signup", signup);
 
router.post("/login", login);

//Logout
router.post("/logout", logout);

router.get("/", checkAuth, async (req, res) => {
  const query = req.query;
  if (query.id) {
    // using async await
    try {
      const user = await User.findById(query.id);
      console.log(req.user);
      res.send(user);
    } catch (e) {
      res.send(e.message);
    }
  } else {
    //using promises
    User.find()
      .select("name email -_id")
      .then((users) => {
        res.send(users);
      })
      .catch((err) => res.send(err.message));
  }
});

router.post("/", checkAuth, (req, res) => {
  const user = req.body;
  User.create(user)
    .then((usr) =>
      res.send({
        msg: "User created sucessfully.",
        usr,
      })
    )
    .catch((err) => res.send(err.message));
});

router.put("/:id", (req, res) => {
  User.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    { new: true }
  )
    .then((user) => {
      res.send({
        msg: "User info has been updated.",
        user,
      });
    })
    .catch((err) => res.send(err.message));
});

router.delete("/:id", checkAuth, (req, res) => {
  User.findByIdAndRemove(req.params.id)
    .then((user) =>
      res.send({
        msg: "User deleted!",
        user,
      })
    )
    .catch((err) => res.send(err.message));
});

module.exports = router;
