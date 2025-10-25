import {
  RepositoryListContainer,
  formatNumber,
} from "../../components/RepositoryList";
import { render, screen, within } from "@testing-library/react-native";
import { expect } from "@jest/globals";
import { NativeRouter } from "react-router-native";

describe("RepositoryList", () => {
  describe("RepositoryListContainer", () => {
    it("renders repository information correctly", () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
          startCursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
        },
        edges: [
          {
            node: {
              id: "jaredpalmer.formik",
              fullName: "jaredpalmer/formik",
              description: "Build forms in React, without the tears",
              language: "TypeScript",
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                "https://avatars2.githubusercontent.com/u/4060187?v=4",
            },
            cursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
          },
          {
            node: {
              id: "async-library.react-async",
              fullName: "async-library/react-async",
              description: "Flexible promise-based React data loader",
              language: "JavaScript",
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                "https://avatars1.githubusercontent.com/u/54310907?v=4",
            },
            cursor:
              "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
          },
        ],
      };

      render(
        <NativeRouter>
          <RepositoryListContainer repositories={repositories} />
        </NativeRouter>
      );

      const repositoryItems = screen.getAllByTestId("repositoryItem");
      const [firstRepositoryItem, secondRepositoryItem] = repositoryItems;

      const firstRepoFullName =
        within(firstRepositoryItem).getByTestId("fullName");
      const firstRepoDescription =
        within(firstRepositoryItem).getByTestId("description");
      const firstRepoLanguage =
        within(firstRepositoryItem).getByTestId("language");
      const firstRepoStars =
        within(firstRepositoryItem).getByTestId("stargazersCount");
      const firstRepoForks =
        within(firstRepositoryItem).getByTestId("forksCount");
      const firstRepoReviews =
        within(firstRepositoryItem).getByTestId("reviewCount");
      const firstRepoRatings =
        within(firstRepositoryItem).getByTestId("ratingAverage");

      expect(firstRepoFullName).toHaveTextContent(
        repositories.edges[0].node.fullName
      );
      expect(firstRepoDescription).toHaveTextContent(
        repositories.edges[0].node.description
      );
      expect(firstRepoLanguage).toHaveTextContent(
        repositories.edges[0].node.language
      );
      expect(firstRepoStars).toHaveTextContent(
        formatNumber(repositories.edges[0].node.stargazersCount)
      );
      expect(firstRepoForks).toHaveTextContent(
        formatNumber(repositories.edges[0].node.forksCount)
      );
      expect(firstRepoReviews).toHaveTextContent(
        formatNumber(repositories.edges[0].node.reviewCount)
      );
      expect(firstRepoRatings).toHaveTextContent(
        formatNumber(repositories.edges[0].node.ratingAverage)
      );

      const secondRepoFullName =
        within(secondRepositoryItem).getByTestId("fullName");
      const secondRepoDescription =
        within(secondRepositoryItem).getByTestId("description");
      const secondRepoLanguage =
        within(secondRepositoryItem).getByTestId("language");
      const secondRepoStars =
        within(secondRepositoryItem).getByTestId("stargazersCount");
      const secondRepoForks =
        within(secondRepositoryItem).getByTestId("forksCount");
      const secondRepoReviews =
        within(secondRepositoryItem).getByTestId("reviewCount");
      const secondRepoRatings =
        within(secondRepositoryItem).getByTestId("ratingAverage");

      expect(secondRepoFullName).toHaveTextContent(
        repositories.edges[1].node.fullName
      );
      expect(secondRepoDescription).toHaveTextContent(
        repositories.edges[1].node.description
      );
      expect(secondRepoLanguage).toHaveTextContent(
        repositories.edges[1].node.language
      );
      expect(secondRepoStars).toHaveTextContent(
        formatNumber(repositories.edges[1].node.stargazersCount)
      );
      expect(secondRepoForks).toHaveTextContent(
        formatNumber(repositories.edges[1].node.forksCount)
      );
      expect(secondRepoReviews).toHaveTextContent(
        formatNumber(repositories.edges[1].node.reviewCount)
      );
      expect(secondRepoRatings).toHaveTextContent(
        formatNumber(repositories.edges[1].node.ratingAverage)
      );
    });
  });
});
