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

export const GET_USERS = gql`
  query GetUsers {
    users {
      edges {
        node {
          username
        }
      }
    }
  }
`;

export const GET_CURRENT_USER = gql`
  query me {
    me {
      id
      username
    }
  }
`;
