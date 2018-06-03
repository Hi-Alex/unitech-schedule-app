import ApolloClient from "apollo-boost";
import gql from "graphql-tag";

export const client = new ApolloClient({
  uri: "/graphql"
});

client.mutate({
  mutation: gql`
    mutation($user: UserInput!) {
      createUser(user: $user) {
        id,
        firstName
      }
    }
  `,
  variables: {
    user: {
      firstName: 'Александр',
      lastName: 'Хижук'
    }
  }
})
  .then(data => console.log(data))
  .catch(err => console.error(err));
