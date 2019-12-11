import gql from "graphql-tag";

export default gql`
  query abbonementen {
    abbonementen {
      _id
      asteroidId
      naam
      active
      user {
        image
      }
    }
  }
`;
