const express = require("express");
const server = express();
server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to the Use My Tech Stuff Build" });
});

module.exports = server;
