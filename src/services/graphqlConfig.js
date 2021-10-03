import {
  ApolloClient,
  InMemoryCache,
} from "@apollo/client";

import { split, HttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';

const httpLink = new HttpLink({
  uri: 'https://stirred-sponge-99.hasura.app/v1/graphql',
  headers: {
    "content-type":"application/json",
    "x-hasura-admin-secret":"l0uvTVYXCXsf9sXtEhLYA5Qxa2uxkkdmkYBuSO44z0KVd6eYN6TvI7sW5OXm648R"
  }
});

const wsLink = new WebSocketLink({
  uri: 'wss://stirred-sponge-99.hasura.app/v1/graphql',
  options: {
    reconnect: true,
    connectionParams: {
      headers: {
        "content-type":"application/json",
        "x-hasura-admin-secret":"l0uvTVYXCXsf9sXtEhLYA5Qxa2uxkkdmkYBuSO44z0KVd6eYN6TvI7sW5OXm648R"
      }
    }
  }
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);


const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink
});


export default client