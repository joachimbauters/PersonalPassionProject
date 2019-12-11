import gql from "graphql-tag";

export default gql`
  query abbonementByAsteroid($asteroidId: String!) {
    abbonementByAsteroid(asteroidId: $asteroidId) {
      naam
      user {
        image
      }
    }
  }
`;
