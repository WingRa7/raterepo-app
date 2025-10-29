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
            repositoryId
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
    $after: String
    $first: Int
  ) {
    repositories(
      searchKeyword: $searchKeyword
      orderDirection: $orderDirection
      orderBy: $orderBy
      after: $after
      first: $first
    ) {
      edges {
        node {
          ...RepoInfo
        }
        cursor
      }
      pageInfo {
        startCursor
        endCursor
        hasNextPage
      }
    }
  }
  ${REPO_INFO}
`;

export const GET_REPOSITORY = gql`
  query GetRepo($id: ID!, $first: Int, $after: String) {
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
      reviews(first: $first, after: $after) {
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
          cursor
        }
        pageInfo {
          endCursor
          hasNextPage
          startCursor
        }
      }
    }
  }
`;
