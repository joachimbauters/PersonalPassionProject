import gql from "graphql-tag";

export default gql`
  query users {
    users {
      naam
      image
      email
    }
  }
`;
