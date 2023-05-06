const express = require("express");
const User = require("../models/userSchema");
const router = express.Router();

router.get("/", async (req, res) => {
  const query = req.query;
  if (query.id) {
    // using async await
    try {
      const user = await User.findById(query.id);
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

router.post("/", (req, res) => {
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

//signup
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user)
    res.status(400).send({
      status: 400,
      error: `User with email ${email} already registered`,
    });
  else {
    try {
      const user = await User.create({ email, name, password });
      res.send({
        status: 200,
        message: "User registered sucessfully",
        user,
      });
    } catch (e) {
      res.status(400).send({
        status: 400,
        error: e.message,
      });
    }
  }
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

router.delete("/:id", (req, res) => {
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
