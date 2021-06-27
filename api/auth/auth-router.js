const router = require("express").Router();

const bcrypt = require("bcryptjs");
const { checkUsernameExists } = require("./auth-middleware");
const { JWT_SECRET } = require("../secrets"); // use this secret!
const Users = require("../users/users-model");
const jwt = require("jsonwebtoken");
const {checkUser}= require('../auth/auth-middleware')


router.post("/register", checkUser, (req, res, next) => {
  let user = req.body;
  //console.log('register req.body',req.body);
  const rounds = process.env.BCRYPT_ROUNDS || 8;
  const hash = bcrypt.hashSync(user.password, rounds);
  // added token to the return from register
  user.password = hash;
  Users.add(user)
    .then((newUser) => {
      const token = makeToken(newUser)
      res.status(201).json({user:newUser, token});
    })
    .catch(next);
});

router.post("/login", checkUsernameExists, (req, res, next) => {
  let { user_name, password } = req.body;

  Users.findBy({ user_name }) // it would be nice to have middleware do this
    .then(([user]) => {
      //console.log("login user", user);
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = makeToken(user);
        res.status(200).json({
          user_id: user.user_id,
          user_name: user.user_name,
          token,
          message: "Welcome back."
        });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch(next);
});
function makeToken(user) {
  const payload = {
    subject: user.user_id,
    username: user.user_name,
  };
  const options = {
    expiresIn: "24h",
  };
  return jwt.sign(payload, JWT_SECRET, options);
}
module.exports = router;
