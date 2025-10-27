import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../graphql/mutations";

const useCreateUser = () => {
  const [mutate, result] = useMutation(CREATE_USER, {
    onError: (error) =>
      console.log(
        "CREATE_USER mutation error:",
        error.graphQLErrors[0].message
      ),
  });

  const submitUserCreate = async ({ username, password }) => {
    const { data } = await mutate({
      variables: {
        user: {
          username: username,
          password: password,
        },
      },
    });
    return { data };
  };

  return [submitUserCreate, result];
};

export default useCreateUser;
