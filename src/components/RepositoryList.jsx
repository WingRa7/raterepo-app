import { useState } from "react";
import { FlatList, View, StyleSheet, Pressable, TextInput } from "react-native";
import { useNavigate } from "react-router-native";
import useRepositories from "../hooks/useRepositories";
import RepositoryItem from "./RepositoryItem";
import { formatNumber } from "../utils/utils";
import RNPickerSelect from "react-native-picker-select";
import theme from "../theme";
import { Chevron } from "react-native-shapes";
import { useDebounce } from "use-debounce";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  container: {
    backgroundColor: theme.colors.cardBackground,
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: theme.colors.border,
    padding: 10,
    marginHorizontal: 15,
    marginTop: 15,
    textAlignVertical: "top",
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

const SortPicker = ({ sort, setSort }) => (
  <>
    <View style={styles.container}>
      <RNPickerSelect
        placeholder={{}}
        Icon={() => {
          return <Chevron size={1.5} color="black" />;
        }}
        onValueChange={(sort) => setSort(sort)}
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

const SearchBar = ({ setFilter }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search repository..."
        onChangeText={(filter) => setFilter(filter)}
      />
    </View>
  );
};

export const RepositoryListContainer = ({
  repositories,
  sort,
  setSort,
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
        <>
          <SearchBar setFilter={setFilter} />
          <SortPicker sort={sort} setSort={setSort} />
        </>
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
  const [sort, setSort] = useState({
    orderBy: "CREATED_AT",
    orderDirection: "DESC",
  });
  const [filter, setFilter] = useState("");
  const [filterDebounce] = useDebounce(filter, 500);

  const queryVariables = { sort, filterDebounce };
  const { repositories } = useRepositories(queryVariables);

  return (
    <RepositoryListContainer
      repositories={repositories}
      sort={sort}
      setSort={setSort}
      setFilter={setFilter}
    />
  );
};

export default RepositoryList;
