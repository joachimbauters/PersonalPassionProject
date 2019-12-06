import gql from "graphql-tag";

export default gql`
  query abbonementen {
    _id
    asteroidId
    price
    naam
    startTime
    endTime
    active
  }
`;
