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
        cheapestTour
        firstAvailableDate
      }
      totalCount
    }
  }
`;

export const GET_TRAVEL_BY_SLUG = gql`
  query ($slug: String!) {
    travelBySlug(slug: $slug) {
      id
      name
      slug
      description
      image
      days
      nights
      cheapestTour
      firstAvailableDate
    }
  }
`;
