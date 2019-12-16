const express = require("express");
const app = express();
require("dotenv").config();
const server = app.listen(process.env.SOCKETPORT || 5000);
const io = require("socket.io")(server);

exports.socketio_api = () => {
  io.on("connection", socket => {
    socket.on("notification", notification => {
      io.sockets.emit(`notification`, notification);
    });
  });
};
