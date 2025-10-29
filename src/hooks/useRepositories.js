import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = ({ filterDebounce, sort, first }) => {
  const { data, error, loading, fetchMore } = useQuery(GET_REPOSITORIES, {
    variables: {
      searchKeyword: filterDebounce,
      orderDirection: sort.orderDirection,
      orderBy: sort.orderBy,
      first: first,
    },
    fetchPolicy: "cache-and-network",
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        searchKeyword: filterDebounce,
        orderDirection: sort.orderDirection,
        orderBy: sort.orderBy,
        first: first,
      },
    });
  };

  const repositories = data ? data.repositories : undefined;

  return { repositories, error, loading, fetchMore: handleFetchMore };
};

export default useRepositories;
