import gql from "graphql-tag";

export default gql`
  mutation cancelAbbonement($abbonementId: String!) {
    cancelAbbonement(abbonementId: $abbonementId) {
      naam
    }
  }
`;
