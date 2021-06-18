const bcrypt = require("bcryptjs");
const router = require("express").Router();
const { checkUsernameExists } = require("./auth-middleware");
const { JWT_SECRET } = require("../secrets"); // use this secret!
const Users = require("../users/users-model");
const jwt = require("jsonwebtoken");

router.post("/register", (req, res, next) => {
  let user = req.body;

  const rounds = process.env.BCRYPT_ROUNDS || 8;
  const hash = bcrypt.hashSync(user.password, rounds);

  user.password = hash;
  Users.add(user).then(res.status(201).json(user)).catch(next);

});

router.post("/login", checkUsernameExists, (req, res, next) => {
  let { user_name, password } = req.body;

  Users.findBy({ user_name }) // it would be nice to have middleware do this
    .then(([user]) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = makeToken(user);
        res.status(200).json({
          message: `Welcome back, ${user.user_name}`,
          token,
        });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch(next);

});
function makeToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
  };
  const options = {
    expiresIn: "24h",
  };
  return jwt.sign(payload, JWT_SECRET, options);
}
module.exports = router;
