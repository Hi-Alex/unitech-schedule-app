import ApolloClient from "apollo-boost";

export const client = new ApolloClient({
  uri: `${process.env.GQL_PROTOCOL}://${process.env.GQL_HOST || location.hostname}:${process.env.GQL_PORT || location.port}/${process.env.GQL_ENDPOINT}`
});
