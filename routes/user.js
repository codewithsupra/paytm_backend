const express = require("express");
const z = require("zod");
const app = express();
const route = express.Router(); // Fixed incorrect `Route()`
const jwt = require("jsonwebtoken"); // Removed extra space in `require`
const { JWT_SECRET_TOKEN } = require("../config"); // Fixed incorrect require syntax
const { User } = require("../db");

const signUpSchema = z.object({
  username: z.string(),
  password: z.string(),
  fname: z.string(),
  l_name: z.string(),
});

route.post("/signUp", async (req, res) => {
  const body = req.body;
  const { success } = signUpSchema.safeParse(body);
  
  if (!success) {
    return res.json({
      msg: "Wrong inputs",
    });
  }

  const existingUser = await User.findOne({
    username: body.username,
  });

  if (existingUser) {
    return res.json({
      msg: `Account already linked to ${existingUser.password}`, // Fixed template string syntax
    });
  }

  const dbUser = await User.create(body); // Fixed missing dbUser assignment
  const userId = dbUser._id;

  const token = jwt.sign({ user_id: userId }, JWT_SECRET_TOKEN); // Fixed incorrect `sign` function call

  res.json({
    msg: "Successfully signed up",
    token,
  });
});

module.exports = route;
