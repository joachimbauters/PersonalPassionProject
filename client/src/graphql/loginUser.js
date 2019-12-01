import gql from "graphql-tag";

export default gql`
  mutation login($email: String!, $wachtwoord: String!) {
    login(email: $email, wachtwoord: $wachtwoord) {
      userId
      token
      tokenExpiration
    }
  }
`;
