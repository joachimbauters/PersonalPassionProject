import gql from "graphql-tag";

export default gql`
  subscription newAbbonement {
    newAbbonement {
      naam
      asteroidId
      user {
        image
      }
    }
  }
`;
