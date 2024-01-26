import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client/core";
import { setContext } from "@apollo/client/link/context";

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("accessToken");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  };
});

const graphQlUrl = import.meta.env.VITE_GRAPHQL_URL;

export class ApolloClientSetup {
  static init() {
    // HTTP connection to the API
    const httpLink = createHttpLink({
      uri: graphQlUrl,
    });

    // Cache implementation
    const cache = new InMemoryCache();

    // Create the apollo client
    const apolloClient = new ApolloClient({
      link: authLink.concat(httpLink),
      cache,
    });

    return apolloClient;
  }
}
