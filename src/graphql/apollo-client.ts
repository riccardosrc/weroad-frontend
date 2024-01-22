import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client/core";

export class ApolloClientSetup {
  static init() {
    // HTTP connection to the API
    const httpLink = createHttpLink({
      uri: "http://localhost:3001/graphql",
    });

    // Cache implementation
    const cache = new InMemoryCache();

    // Create the apollo client
    const apolloClient = new ApolloClient({
      link: httpLink,
      cache,
    });

    return apolloClient;
  }
}
