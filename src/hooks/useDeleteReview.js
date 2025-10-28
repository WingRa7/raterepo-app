import { useMutation } from "@apollo/client";
import { DELETE_REVIEW } from "../graphql/mutations";

const useDeleteReview = () => {
  const [mutate, result] = useMutation(DELETE_REVIEW, {
    onError: (error) =>
      console.log(
        "DELETE_REVIEW mutation error:",
        error.graphQLErrors[0].message
      ),
  });

  const submitDeleteReview = async (id) => {
    const { data } = await mutate({
      variables: {
        deleteReviewId: id,
      },
    });
    return { data };
  };

  return [submitDeleteReview, result];
};

export default useDeleteReview;
