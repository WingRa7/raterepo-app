import { useState } from "react";
import { FlatList, View, StyleSheet, Pressable } from "react-native";
import { useNavigate } from "react-router-native";
import useRepositories from "../hooks/useRepositories";
import RepositoryItem from "./RepositoryItem";
import { formatNumber } from "../utils/utils";
import RNPickerSelect from "react-native-picker-select";
import theme from "../theme";
import { Chevron } from "react-native-shapes";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  pickerContainer: {
    backgroundColor: theme.colors.cardBackground,
  },
});

const pickerStyles = StyleSheet.create({
  inputIOS: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    paddingRight: 30,
    margin: 15,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: theme.colors.border,
  },
  inputAndroid: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderRadius: 10,
    paddingRight: 30,
    iconContainer: {
      top: 5,
      right: 15,
    },
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const FilterPicker = ({ filter, setFilter }) => (
  <>
    <View style={styles.pickerContainer}>
      <RNPickerSelect
        placeholder={{}}
        Icon={() => {
          return <Chevron size={1.5} color="black" />;
        }}
        onValueChange={(filter) => setFilter(filter)}
        items={[
          {
            label: "Latest repositories",
            value: { orderBy: "CREATED_AT", orderDirection: "DESC" },
          },
          {
            label: "Highest rated repositories",
            value: { orderBy: "RATING_AVERAGE", orderDirection: "DESC" },
          },
          {
            label: "Lowest rated repositories",
            value: { orderBy: "RATING_AVERAGE", orderDirection: "ASC" },
          },
        ]}
        style={{
          ...pickerStyles,
          iconContainer: {
            top: 30,
            right: 35,
          },
        }}
      />
    </View>
    <ItemSeparator />
  </>
);

export const RepositoryListContainer = ({
  repositories,
  filter,
  setFilter,
}) => {
  const navigate = useNavigate();

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={
        <FilterPicker filter={filter} setFilter={setFilter} />
      }
      renderItem={({ item }) => (
        <Pressable onPress={() => navigate(`/${item.id}`)}>
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
        </Pressable>
      )}
    />
  );
};

const RepositoryList = () => {
  const [filter, setFilter] = useState({
    orderBy: "CREATED_AT",
    orderDirection: "DESC",
  });
  const { repositories } = useRepositories(filter);

  // orderBy: CREATED_AT or RATING_AVERAGE
  // orderDirection: ASC or DESC

  return (
    <RepositoryListContainer
      repositories={repositories}
      filter={filter}
      setFilter={setFilter}
    />
  );
};

export default RepositoryList;
