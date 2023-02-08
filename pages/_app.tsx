import Fonts from "@/components/Atoms/Fonts";
import { persistor, store } from "@/states/store";
import { getAccessToken } from "@/utils";
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
  split,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { PersistGate as PersistGateClient } from "redux-persist/integration/react";

import type { ReactNode } from "react";
// import { WebSocketLink } from "apollo-link-ws";
// import * as ws from "ws";
// import { WebSocketLink } from "@apollo/client/link/ws";
// import Websocket from "ws";
// import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
// import { createClient } from "graphql-ws";

import "@/styles/globals.css";

const backEndUrl =
  typeof process.env.NEXT_PUBLIC_BACKEND_URL === "string"
    ? process.env.NEXT_PUBLIC_BACKEND_URL
    : "";
// const wsUrl =
//   typeof process.env.NEXT_PUBLIC_WS_LINK === "string"
//     ? process.env.NEXT_PUBLIC_WS_LINK
//     : "";
// const wsLink =
//   typeof window !== "undefined"
//     ? new GraphQLWsLink(
//         createClient({
//           url: `${wsUrl}/graphql`,
//           connectionParams: {
//             Authorization: `Bearer ${getAccessToken()}`,
//           },
//           connectionAckWaitTimeout: Infinity,
//         }),
//       )
//     : null;

// const httpLink = new HttpLink({
//   uri: `${backEndUrl}/graphql`,
//   headers: {
//     authorization: `Bearer ${getAccessToken()}`,
//   },
// });

// const splitLink =
//   typeof window !== "undefined" && wsLink !== null
//     ? split(
//         ({ query }) => {
//           const def = getMainDefinition(query);
//           return (
//             def.kind === "OperationDefinition" &&
//             def.operation === "subscription"
//           );
//         },
//         wsLink,
//         httpLink
//       )
//     : httpLink;
// console.log("split link", splitLink)
// console.log("ws link", wsLink)
// console.log("https link", httpLink)
// const client = new ApolloClient({
//   link: splitLink,
//   cache: new InMemoryCache(),
//   // credentials: 'include',
//   // headers: {
//   //   authorization: `Bearer ${getAccessToken()}`,
//   // },
// });

const wsUrl =
  typeof process.env.NEXT_PUBLIC_BACKEND_WS_URL === "string"
    ? process.env.NEXT_PUBLIC_BACKEND_WS_URL
    : "";

// get the authentication token from local storage if it exists
const token = getAccessToken();

const httpLink = createHttpLink({
  uri: `${backEndUrl}/graphql`,
  headers: {
    authorization: token.length > 0 ? `Bearer ${token}` : "",
  },
});

const wsLink =
  typeof window !== "undefined"
    ? new WebSocketLink({
        uri: `${wsUrl}/graphql`,
        options: {
          reconnect: true,
          connectionParams: {
            Authorization: token,
          },
        },
      })
    : null;

const authLink = setContext((_, { headers }) => {
  const updatedToken = getAccessToken();
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: updatedToken.length > 0 ? `Bearer ${updatedToken}` : "",
    },
  };
});

const splitLink =
  typeof window !== "undefined" && wsLink !== null
    ? split(
        ({ query }) => {
          const definition = getMainDefinition(query);

          return (
            definition.kind === "OperationDefinition" &&
            definition.operation === "subscription"
          );
        },
        wsLink,
        authLink.concat(httpLink)
        // httpLink
      )
    : authLink.concat(httpLink);

const client = new ApolloClient({
  // uri: `${backEndUrl}/graphql`,
  link: splitLink,
  cache: new InMemoryCache(),
  // credentials: 'include',
  // headers: {
  //   Authorization: getAccessToken() ? `Bearer ${getAccessToken()}` : "",
  // },
});

const customTheme = extendTheme({
  colors: {
    brand: {
      yellow: "#FFDD00",
      grey: "#393939",
      red: "#F55A5A",
      cream: "#FFFAE0",
      lightGrey: "#FAFAFA",
    },
  },
  fonts: {
    heading: '"Avenir Next", sans-serif',
    body: '"Avenir Next", sans-serif',
  },
  breakpoints: {
    sm: "30em",
    md: "48em",
    lg: "62em",
    xl: "80em",
    "2xl": "96em",
    "3xl": "114em",
  },
  components: {
    Table: {
      variants: {
        mytable: {
          tbody: {
            tr: {
              _odd: {
                background: "#FFFAE0",
              },
            },
          },
        },
      },
    },
  },
});

const PersistGateServer = ({ children }: { children: ReactNode }) => {
  return children;
};

function MyApp({ Component, pageProps }: AppProps) {
  let runtime = process.env.RUNTIME;
  let PersistGate = PersistGateServer as unknown as typeof PersistGateClient;
  if (runtime === "browser") {
    PersistGate = PersistGateClient;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ApolloProvider client={client}>
          <ChakraProvider theme={customTheme}>
            <Fonts />
            <Component {...pageProps} />
          </ChakraProvider>
        </ApolloProvider>
      </PersistGate>
    </Provider>
  );
}
export default MyApp;
