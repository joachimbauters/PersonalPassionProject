const express = require("express");
const { GraphQLServer } = require("graphql-yoga");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const isAuth = require("./app/middleware/is-auth");

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

const server = new GraphQLServer({
  typeDefs: `${__dirname}/app/schema.graphql`,
  resolvers
});

//server.express.use(express.static(path.resolve(__dirname, "../client/build")));
server.express.use(isAuth);

server.express.use(cookieParser());
server.express.use(bodyParser.urlencoded({ extended: true }));
server.express.use(bodyParser.json());

// server.express.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
// });

server.start(() => console.log(`Server is running on ${process.env.PORT}`));
