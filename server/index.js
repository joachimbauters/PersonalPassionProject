const { GraphQLServer } = require("graphql-yoga");

const mongoose = require("mongoose");

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

// server.start(() => console.log("Server is running on localhost:4000"));

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
