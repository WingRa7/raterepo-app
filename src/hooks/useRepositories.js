import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = (filter) => {
  const { data, error, loading } = useQuery(GET_REPOSITORIES, {
    variables: filter,
    fetchPolicy: "cache-and-network",
  });

  const repositories = data ? data.repositories : undefined;

  return { repositories, error, loading };
};

export default useRepositories;
