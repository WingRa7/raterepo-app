import { gql } from "@apollo/client";
import { REPO_INFO } from "./fragments";

export const GET_REPOSITORIES = gql`
  query GetRepos {
    repositories {
      edges {
        node {
          ...RepoInfo
        }
      }
    }
  }
  ${REPO_INFO}
`;
