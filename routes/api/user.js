const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const User = require("../../models/User");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
//route POST api/users
// desc Register User

router.post(
  "/",
  [
    check("name", "Name is required")
      .not()
      .isEmpty(),
    check("email", "Please Include a valid email address").isEmail(),
    check(
      "password",
      "please enter a password with 6 or more character"
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    try {
      // See if users already Exist
      let user = await User.findOne({ email });
      if (user) {
        res.status(400).json({ errors: [{ msg: "User already exists" }] });
      }
      // Get User Gravatar
      const avatar = gravatar.url(email, {
        s: "200", //size
        r: "pg",
        d: "mm" //picture
      });
      user = new User({
        name,
        email,
        avatar,
        password
      });

      //Encrypt Password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();
      res.send("User Registered");
      //Return jsonWebToken
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server Error");
    }

    res.send("User Route");
  }
);
module.exports = router;