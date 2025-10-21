import { useMutation } from "@apollo/client";
import { LOGIN } from "../graphql/mutations";

const useSignIn = () => {
  const [login, result] = useMutation(LOGIN, {
    onError: (error) =>
      console.log("LOGIN mutation error:", error.graphQLErrors[0].message),
  });

  const signIn = async ({ username, password }) => {
    const result = await login({ variables: { username, password } });
    return result;
  };

  return [signIn, result];
};

export default useSignIn;
