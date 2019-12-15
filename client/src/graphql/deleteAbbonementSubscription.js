import gql from "graphql-tag";

export default gql`
  subscription deleteAbbonement {
    deleteAbbonement {
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
