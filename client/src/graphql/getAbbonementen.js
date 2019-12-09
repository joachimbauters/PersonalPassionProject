import gql from "graphql-tag";

export default gql`
  query abbonementen {
    abbonementen {
      asteroidId
      naam
      active
      user {
        image
      }
    }
  }
`;
