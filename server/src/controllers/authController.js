const authService = require("../services/authService");

async function signIn(req, res) {
  try {
    const { email, password } = req.body;

    const result = await authService.signIn(email, password);

    // Send refresh token as httpOnly cookie (secure, not accessible via JS)
    res.cookie("refreshToken", result.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Send access token in response body
    res.json({
      accessToken: result.accessToken,
      user: result.user,
    });
  } catch (error) {
    res.status(401).json({
      message: error.message,
    });
  }
}

async function signUp(req, res) {
  try {
    const { firstName, lastName, password, email } = req.body;
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

async function refresh(req, res) {
  try {
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({ message: "Refresh token required" });
    }

    const result = await authService.refreshAccessToken(refreshToken);
    res.json(result);
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
}

async function signOut(req, res) {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  res.json({ message: "Signed out successfully" });
}

module.exports = {
  signIn,
  signUp,
  refresh,
  signOut,
};
