const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const authRouter = require("./auth/auth-router");
const usersRouter = require("./users/users-router");
const itemsRouter = require("./items/items-router");

const reviewsRouter = require("./reviews/reviews-router");

const server = express();

server.use(helmet());
server.use(express.json())
server.use(cors())


server.use("/api/auth", authRouter)
server.use("/api/users", usersRouter)
server.use("/api/items", itemsRouter)
server.use("/api/reviews", reviewsRouter)


server.get("/", (req, res) => {
  res.status(200).json({ message: process.env.MOTD });
});



server.use((err, req, res, next) => { // eslint-disable-line
    res.status(err.status || 500).json({
      message: err.message,
      stack: err.stack,
    });
  });

module.exports = server;
