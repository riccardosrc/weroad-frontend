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
