const authService = require("../services/authService");

async function signIn(req, res) {
  try {
    const {email, password} = req.body;

    const result = await authService.signIn(email, password);

    res.json(result);
  } catch (error) {
    res.status(401).json({
      message: error.message,
    });
  }
}

async function signUp(req, res) {
  try {
    const {firstName, lastName, password, email} = req.body;
    const result = await authService.signUp(
      firstName,
      lastName,
      email,
      password,
    );
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(401).json({
      message: error.message,
    });
  }
}

module.exports = {
  signIn,
  signUp,
};
