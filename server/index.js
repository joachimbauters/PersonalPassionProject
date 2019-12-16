const express = require("express");
const { GraphQLServer, PubSub } = require("graphql-yoga");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const isAuth = require("./app/middleware/is-auth");
const { socketio_api } = require("./socketApi");

require("dotenv").config();

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then(() => console.log("db connected"))
  .catch(e => {
    console.log("Error, exiting", e);
    process.exit();
  });

const resolvers = require("./app/resolvers.js");

const pubsub = new PubSub();

const server = new GraphQLServer({
  typeDefs: `${__dirname}/app/schema.graphql`,
  resolvers,
  context: req => ({ ...req, pubsub })
});

server.express.use(express.static(path.resolve(__dirname, "../client/build")));
server.express.use(isAuth);

server.express.use(cookieParser());
server.express.use(bodyParser.urlencoded({ extended: true }));
server.express.use(bodyParser.json({ limit: "100mb" }));

server.express.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

const options = {
  endpoint: "/graphql",
  subscriptions: "/subscriptions",
  playground: "/playground"
};

socketio_api();

server.start(options, () =>
  console.log(`Server is running on ${process.env.PORT}`)
);
