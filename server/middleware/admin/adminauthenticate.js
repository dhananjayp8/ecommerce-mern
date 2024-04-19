const adminDB = require("../../model/admin/adminModel");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;
const adminauthenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    //console.log("token", token);
    const verifyToken = jwt.verify(token, SECRET_KEY);
    //console.log(verifyToken);
    const rootUser = await adminDB.findOne({ _id: verifyToken._id });
    //console.log(rootUser);
    if (!rootUser) {
      throw new Error("User not found");
    }
    req.token = token;
    req.rootUser = rootUser;
    req.userId = rootUser._id;
    next();
  } catch (error) {
    res.status(400).json({ error: "Unauthorized no token provide" });
  }
};

module.exports = adminauthenticate;
