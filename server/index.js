const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();

app.use(express.static(path.resolve(__dirname, "../client/build")));

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.listen(process.env.PORT, () => {
  console.log(`Server luistert op poort ${process.env.PORT}`);
});

// const { GraphQLServer } = require("graphql-yoga");

// const mongoose = require("mongoose");

// require("dotenv").config();

// mongoose
//   .connect(process.env.DB_URL, {
//     useNewUrlParser: true,
//     useFindAndModify: false,
//     useCreateIndex: true
//   })
//   .then(() => console.log("db connected"))
//   .catch(e => {
//     console.log("Error, exiting", e);
//     process.exit();
//   });

// const resolvers = require("./app/resolvers.js");

// const server = new GraphQLServer({
//   typeDefs: `${__dirname}/app/schema.graphql`,
//   resolvers
// });

// // server.start(() => console.log("Server is running on localhost:4000"));

// server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
//   console.log(`🚀 Server ready at ${url}`);
// });
