import { useQuery } from "@apollo/client";
import { GET_REPOSITORY } from "../graphql/queries";

const useRepository = ({ id, first }) => {
  const { data, error, loading, fetchMore } = useQuery(GET_REPOSITORY, {
    variables: { id: id, first: first },
    fetchPolicy: "cache-and-network",
  });

  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data?.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        id: id,
        first: first,
      },
    });
  };

  const repository = data ? data.repository : undefined;

  return { repository, error, loading, fetchMore: handleFetchMore };
};

export default useRepository;
