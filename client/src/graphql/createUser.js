import gql from "graphql-tag";

export default gql`
  mutation createUser($userInput: UserInput!) {
    createUser(userInput: $userInput) {
      _id
      naam
      email
    }
  }
`;
