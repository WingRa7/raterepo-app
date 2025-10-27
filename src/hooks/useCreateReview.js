import { useMutation } from "@apollo/client";
import { CREATE_REVIEW } from "../graphql/mutations";

const useCreateReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW, {
    onError: (error) =>
      console.log(
        "CREATE_REVIEW mutation error:",
        error.graphQLErrors[0].message
      ),
  });

  const submitReview = async ({ repoOwner, repoName, rating, review }) => {
    const { data } = await mutate({
      variables: {
        review: {
          ownerName: repoOwner,
          repositoryName: repoName,
          rating: parseInt(rating),
          text: review,
        },
      },
    });
    return { data };
  };

  return [submitReview, result];
};

export default useCreateReview;
