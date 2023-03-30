const express = require("express");
const router = express.Router();

var users = [
  {
    id: 1,
    name: "sushil",
  },
  {
    id: 2,
    name: "Bimala",
  },
];

router.get("/", (req, res) => {
  const query = req.query;
  if (query.id) {
    const user = users.find((user) => user.id == query.id);
    if (user) res.send(user);
    else res.status(404).send({ error: `User with id ${query.id} not found` });
  } else {
    res.send(users);
  }
});

router.post("/", (req, res) => {
  const user = req.body;
  users.push(user);
  res.send({
    msg: "User added sucessfully",
    user: user,
  });
});

router.put("/:id", (req, res) => {
  const userId = req.params.id;
  const userName = req.body.name;
  const user = users.find((user) => user.id == userId);
  if (user) {
    user.name = userName;
    res.send({ msg: "User has been updated", user: user });
  } else res.status(404).send({ error: `User with id ${userId} not found` });
});

router.delete("/:id", (req, res) => {
  const userId = req.params.id;
  const user = users.find((user) => user.id == userId);
  if (user) {
    users = users.filter(user => user.id != userId);
    res.send({ msg: "User deleted sucessfully" });
  } else res.status(404).send({ error: `User with id ${userId} not found` });
});

module.exports = router;
