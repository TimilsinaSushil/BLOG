const express = require("express");
const User = require("../models/userSchema");
const router = express.Router();
const bcrypt = require("bcryptjs");
const validator = require("validator");

// function to create error response
function createErrorResponse(status, message) {
  return {
    status,
    error: {
      message,
    },
  };
}

//signup
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  if (!validator.isEmail(email)) {
    res.status(400).send(createErrorResponse(400, "Invalid email"));
    return;
  }

  const user = await User.findOne({ email });
  if (user)
    res
      .status(400)
      .send(
        createErrorResponse(400, `User with email ${email} already registered`)
      );
  else {
    try {
      //hashing password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = await User.create({ email, name, password: hashedPassword });

      //setting cookie in response
      res.cookie("user", user.email, {
        signed: true,
        maxAge: 2 * 60 * 1000,
      });

      res.send({
        status: 200,
        message: "User registered sucessfully",
        user,
      });
    } catch (e) {
      res.status(400).send(createErrorResponse(400, e.message));
    }
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  //checking user is logged in or not using cookie

  if (req.signedCookies.user) {
    res.status(400).send("You are already logged in");
    return;
  }

  // validating email format
  if (!validator.isEmail(email)) {
    res.status(400).send(createErrorResponse(400, "Invalid email"));
    return;
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      res
        .status(400)
        .send(createErrorResponse(400, `${email} is not registered`));
    } else {
      try {
        isMatch = await bcrypt.compare(password, user.password);
      } catch (e) {
        res
          .status(500)
          .send(createErrorResponse(500, "Error comparing passwords"));
        return;
      }
      if (isMatch) {
        //setting cookie in response
        res.cookie("user", user.email, {
          signed: true,
          maxAge: 2 * 60 * 1000,
        });
        res.send({ status: 200, message: "Login Successful" });
      } else {
        res.status(400).send(createErrorResponse(400, "Incorrect Password"));
      }
    }
  } catch (e) {
    res.status(400).send(createErrorResponse(400, e.message));
  }
});

//Logout
router.post("/logout", (req, res) => {
  if (req.signedCookies.user) {
    res.clearCookie("user");
    res.send("You are logged out");
  } else {
    res.status(400).send(createErrorResponse(400, "You are not logged in"));
  }
});

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
