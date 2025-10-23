import useAuthStorage from "../hooks/useAuthStorage";
import { ApolloClient, useApolloClient } from "@apollo/client";

import { useMutation } from "@apollo/client";
import { LOGIN } from "../graphql/mutations";

const useSignIn = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const [mutate, result] = useMutation(LOGIN, {
    onError: (error) =>
      console.log("LOGIN mutation error:", error.graphQLErrors[0].message),
  });

  const signIn = async ({ username, password }) => {
    const { data } = await mutate({ variables: { username, password } });
    if (data) {
      authStorage.setAccessToken(data.authenticate.accessToken);
    }
    apolloClient.resetStore();
    return { data };
  };

  return [signIn, result];
};

export default useSignIn;
