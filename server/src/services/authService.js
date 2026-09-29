const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

function generateAccessToken(userId) {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "15m",
  });
}

function generateRefreshToken(userId) {
  return jwt.sign({ id: userId }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "7d",
  });
}

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

  const accessToken = generateAccessToken(foundUser.id);
  const refreshToken = generateRefreshToken(foundUser.id);

  return {
    accessToken,
    refreshToken,
    user: {
      id: foundUser.id,
      email: foundUser.email,
    },
  };
}

async function refreshAccessToken(refreshToken) {
  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const accessToken = generateAccessToken(decoded.id);
    return { accessToken };
  } catch (error) {
    throw new Error("Invalid refresh token");
  }
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
  refreshAccessToken,
};
