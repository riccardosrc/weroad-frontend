import { gql } from "graphql-tag";

export const LOGIN = gql`
  mutation login($loginInput: LoginInput!) {
    login(loginInput: $loginInput) {
      accessToken
    }
  }
`;

export const CREATE_TRAVEL = gql`
  mutation createTravel($createTravelInput: CreateTravelInput) {
    createTravel(createTravelInput: $createTravelInput) {
      id
    }
  }
`;
