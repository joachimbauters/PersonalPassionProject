import gql from "graphql-tag";

export default gql`
  subscription newAbbonement {
    newAbbonement {
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
