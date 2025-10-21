import { useState, useEffect } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import useRepositories from "../hooks/useRepositories";
import RepositoryItem from "./RepositoryItem";
import theme from "../theme";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const formatNumber = (number) => {
  if (number < 1e3) {
    return number.toString();
  } else if (number < 1e6) {
    return Math.floor(number / 1e2) / 10 + "K";
  } else if (number < 1e9) {
    return Math.floor(number / 1e5) / 10 + "M";
  } else {
    return Math.floor(number / 1e8) / 10 + "B";
  }
};

const RepositoryList = () => {
  const { repositories } = useRepositories();

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <RepositoryItem
          fullName={item.fullName}
          description={item.description}
          language={item.language}
          forksCount={formatNumber(item.forksCount)}
          stargazersCount={formatNumber(item.stargazersCount)}
          ratingAverage={item.ratingAverage}
          reviewCount={formatNumber(item.reviewCount)}
          ownerAvatarUrl={item.ownerAvatarUrl}
        />
      )}
    />
  );
};

export default RepositoryList;
