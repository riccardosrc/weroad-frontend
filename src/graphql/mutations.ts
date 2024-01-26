import { gql } from "graphql-tag";

export const LOGIN = gql`
  mutation ($loginInput: LoginInput!) {
    login(loginInput: $loginInput) {
      accessToken
    }
  }
`;

export const CREATE_TRAVEL = gql`
  mutation ($createTravelInput: CreateTravelInput!) {
    createTravel(createTravelInput: $createTravelInput) {
      id
    }
  }
`;

export const DELETE_TRAVEL = gql`
  mutation ($id: String!) {
    deleteTravel(id: $id) {
      message
    }
  }
`;

export const CREATE_TOUR = gql`
  mutation ($createTourInput: CreateTourInput!) {
    createTour(createTourInput: $createTourInput) {
      id
    }
  }
`;

export const UPDATE_TOUR = gql`
  mutation ($id: String!, $updateTourInput: UpdateTourInput!) {
    updateTour(id: $id, updateTourInput: $updateTourInput) {
      id
    }
  }
`;
