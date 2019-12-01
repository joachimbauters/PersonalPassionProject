import gql from "graphql-tag";

export default gql`
  mutation updateUser(
    $_id: String!
    $naam: String!
    $image: String!
    $email: String!
    $wachtwoord: String!
  ) {
    updateUser(
      _id: $_id
      naam: $naam
      image: $image
      email: $email
      wachtwoord: $wachtwoord
    ) {
      naam
      email
    }
  }
`;
