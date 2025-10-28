import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = ({ filterDebounce, sort }) => {
  const { data, error, loading } = useQuery(GET_REPOSITORIES, {
    variables: {
      searchKeyword: filterDebounce,
      orderDirection: sort.orderDirection,
      orderBy: sort.orderBy,
    },
    fetchPolicy: "cache-and-network",
  });

  const repositories = data ? data.repositories : undefined;

  return { repositories, error, loading };
};

export default useRepositories;
