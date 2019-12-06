import gql from "graphql-tag";

export default gql`
  query user {
    user {
      naam
      image
      email
    }
  }
`;
