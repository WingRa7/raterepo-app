import { gql } from "@apollo/client";
import { REPO_INFO } from "./fragments";

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
  query me($withReviews: Boolean = false) {
    me {
      id
      username
      reviews @include(if: $withReviews) {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
      }
    }
  }
`;

export const GET_REPOSITORIES = gql`
  query GetRepos(
    $searchKeyword: String
    $orderDirection: OrderDirection
    $orderBy: AllRepositoriesOrderBy
  ) {
    repositories(
      searchKeyword: $searchKeyword
      orderDirection: $orderDirection
      orderBy: $orderBy
    ) {
      edges {
        node {
          ...RepoInfo
        }
      }
    }
  }
  ${REPO_INFO}
`;

export const GET_REPOSITORY = gql`
  query GetRepo($id: ID!) {
    repository(id: $id) {
      id
      fullName
      url
      description
      language
      forksCount
      stargazersCount
      ratingAverage
      reviewCount
      ownerAvatarUrl
      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
      }
    }
  }
`;
