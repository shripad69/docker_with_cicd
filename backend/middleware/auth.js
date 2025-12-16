const { user } = require("../db");
const jwt = require("jsonwebtoken");
const secretKey = "abcde12345";


async function auth (req, res, next) {
  // console.log("inside");
  try {
    const encodedToken = req.headers.token;

    if (!encodedToken) {
      // console.log("no token");
      return res.json({ message: "token missing" });
    }

    const decodedToken = jwt.verify(encodedToken, secretKey);
    const currentuserId = decodedToken.userId;

    const currentuser = await user.findOne({
      userId: currentuserId
    });

    // console.log (currentuser.userId);

    if (currentuser.userId) {

      req.userId = currentuser.userId;
      // console.log("hey");
      next();

    } 
    else {
      res.json({
        message: "invalid token",
      });
    }
  } catch (err) {
    res.json({ message: "unauthorized", error: err.message });
  }
}

module.exports = {
  auth: auth,
};
