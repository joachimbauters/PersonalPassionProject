import gql from "graphql-tag";

export default gql`
  query user($id: String!) {
    user(id: $id) {
      naam
      image
      email
    }
  }
`;
