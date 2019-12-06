import gql from "graphql-tag";

export default gql`
  query user {
    user {
      createdAbbonementen {
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
