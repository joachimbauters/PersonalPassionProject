import gql from "graphql-tag";

export default gql`
  mutation updateUser(
    $naam: String!
    $image: String!
    $email: String!
    $wachtwoord: String!
  ) {
    updateUser(
      naam: $naam
      image: $image
      email: $email
      wachtwoord: $wachtwoord
    ) {
      naam
      email
      image
    }
  }
`;
