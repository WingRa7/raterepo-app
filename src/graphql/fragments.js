import { gql } from "@apollo/client";

export const REPO_INFO = gql`
  fragment RepoInfo on Repository {
    fullName
    description
    language
    forksCount
    stargazersCount
    ratingAverage
    reviewCount
    ownerAvatarUrl
  }
`;
