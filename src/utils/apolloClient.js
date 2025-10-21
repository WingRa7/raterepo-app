import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import Constants from "expo-constants";

const createApolloClient = () => {
  return new ApolloClient({
    link: new HttpLink({ uri: Constants.expoConfig.extra.apolloURI }),
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
