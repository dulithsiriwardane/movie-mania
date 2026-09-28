const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function signIn(email, password) {
  const user = await userModel.findUserByEmail(email);
  if (!user.length) {
    throw new Error("Invalid email or password");
  }

  const foundUser = user[0];

  const passwordMatch = await bcrypt.compare(password, foundUser.password);

  if (!passwordMatch) {
    throw new Error("Invalid email or password");
  }

  const token = jwt.sign({id: foundUser.id}, process.env.JWT_SECRET, {
    expiresIn: "15m",
  });

  return {
    token,
    user: {
      id: foundUser.id,
      email: foundUser.email,
    },
  };
}

async function signUp(firstName, lastName, email, password) {
  const rows = await userModel.findUserByEmail(email);
  if (rows.length) {
    throw new Error("User with the email already exists");
  } else {
    const response = await userModel.createUser(
      firstName,
      lastName,
      password,
      email,
    );
    console.log(response);
    return response;
  }
}

module.exports = {
  signIn,
  signUp,
};
