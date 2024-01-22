import { gql } from "graphql-tag";

export const GET_TRAVELS = gql`
  query {
    travels {
      items {
        id
        name
        slug
        description
        days
        nights
      }
      totalCount
    }
  }
`;
