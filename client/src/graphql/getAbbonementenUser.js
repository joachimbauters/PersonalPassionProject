import gql from "graphql-tag";

export default gql`
  query user {
    user {
      createdAbbonementen {
        _id
        asteroidId
        price
        naam
        startTime
        endTime
        active
      }
    }
  }
`;
