const User = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const createToken = require("../utils/createToken");
const checkAuth = require("../middlewares/checkAuth");

//function to create error response
function createErrorResponse(status, message) {
  return {
    status,
    error: {
      message,
    },
  };
}


const signup = async (req, res) => {
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
        // res.cookie("user", user.email, {
        //   signed: true,
        //   maxAge: 2 * 60 * 1000,
        // });
  
        //setting session info
        // req.session.isAuth = true;
  
        //token based authentication
        const token = createToken(user._id);
  
  
        res.send({
          status: 200,
          message: "User registered sucessfully",
          token,
        });
      } catch (e) {
        res.status(400).send(createErrorResponse(400, e.message));
      }
    }
  }



  const login = async (req, res) => {
    const { email, password } = req.body;
  
    //checking user is logged in or not using cookie
  
    // if (req.signedCookies.user) {
    //   res.status(400).send("You are already logged in");
    //   return;
    // }
  
    //checking session info
  
    // if (req.session.isAuth) {
    //   res.status(400).send("You are already logged in");
    //   return;
    // }
  
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
          // res.cookie("user", user.email, {
          //   signed: true,
          //   maxAge: 2 * 60 * 1000,
          // });
  
          //setting session info
          // req.session.isAuth = true;
  
          //token based authentication
          const token = createToken(user._id);
  
  
          res.send({ status: 200, message: "Login Successful", token });
        } else {
          res.status(400).send(createErrorResponse(400, "Incorrect Password"));
        }
      }
    } catch (e) {
      res.status(400).send(createErrorResponse(400, e.message));
    }
  }


  const logout = (req, res) => {
    // if (req.signedCookies.user) {
    //   res.clearCookie("user");
    //   res.send("You are logged out");
    // } else {
    //   res.status(400).send(createErrorResponse(400, "You are not logged in"));
    // }
  
    if (req.session.isAuth) {
      req.session.destroy();
      res.send("You are logged out");
    } else {
      res.status(400).send(createErrorResponse(400, "You are not logged in"));
    }
  }


  module.exports = {signup, login, logout}