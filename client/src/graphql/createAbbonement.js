import gql from "graphql-tag";

export default gql`
  mutation createAbbonement($abbonementInput: AbbonementInput!) {
    createAbbonement(abbonementInput: $abbonementInput) {
      _id
      asteroidId
      price
      startTime
      endTime
      active
    }
  }
`;
