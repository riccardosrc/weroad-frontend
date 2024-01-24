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
      mood {
        nature
        culture
        history
        relax
        party
      }
    }
  }
`;

export const GET_TOURS = gql`
  query ($offset: Int, $limit: Int) {
    tours(offset: $offset, limit: $limit) {
      items {
        id
        name
        price
        startDate
        endDate
        travel {
          id
          name
          slug
          days
          nights
        }
      }
      totalCount
    }
  }
`;
