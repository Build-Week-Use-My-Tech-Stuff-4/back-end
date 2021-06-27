const { JWT_SECRET } = require("../secrets"); // use this secret!
const jwt = require("jsonwebtoken");
const Users = require("../users/users-model");

const restricted = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    res.status(401).json({ message: "Token required" });
  } else {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        res.status(401).json({ message: "Token invalid" });
      } else {
        req.decodedToken = decoded;
        next();
      }
    });
  }
};

const checkUsernameExists = (req, res, next) => {
  const { username } = req.body;
  const exists = Users.findBy(username);
  if (exists) {
    next();
  } else {
    res.status(401).json({ message: "Invalid Credentials" });
  }
};
const checkUser = (req, res, next) => {
  const {user_name, password} = req.body
 if(!user_name || !password){
  res.status(400).json({ message: "username and password required" });
 }else{
     next()
 }
}




module.exports = {
  restricted,
  checkUsernameExists,
  checkUser
};
