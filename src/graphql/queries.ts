import { gql } from "graphql-tag";

export const GET_TRAVELS = gql`
  query ($offset: Int, $limit: Int) {
    travels(offset: $offset, limit: $limit) {
      items {
        id
        name
        slug
        description
        image
        days
        nights
      }
      totalCount
    }
  }
`;
