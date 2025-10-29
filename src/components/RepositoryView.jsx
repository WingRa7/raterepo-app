import { View, StyleSheet, Image, Pressable, FlatList } from "react-native";
import { useParams } from "react-router-native";
import theme from "../theme";
import Text from "./Text";
import Badge from "./Badge";
import Button from "./Button";
import useRepository from "../hooks/useRepository";
import * as Linking from "expo-linking";
import { formatNumber } from "../utils/utils";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  repoContainer: {
    backgroundColor: theme.colors.cardBackground,
  },
  infoContainer: {
    display: "flex",
    flexDirection: "row",
  },
  infoText: {
    padding: 5,
    marginTop: 10,
    gap: 8,
    maxWidth: 300,
  },
  avatar: {
    width: 50,
    height: 50,
    padding: 10,
    margin: 20,
    borderRadius: 5,
  },
  statsContainer: {
    padding: 5,
    display: "flex",
    flexDirection: "row",
    gap: 20,
    justifyContent: "center",
  },
  stat: {
    padding: 5,
    margin: 5,
    display: "flex",
    alignItems: "center",
    gap: 5,
  },
  circle: {
    marginTop: 20,
    marginHorizontal: 15,
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: theme.colors.primary,
  },
  reviewText: {
    paddingVertical: 10,
    marginVertical: 10,
    gap: 5,
    maxWidth: 300,
  },
});

const RepositoryView = () => {
  const { id } = useParams();
  const itemsPerPage = 8;

  const queryVariables = {
    id: id,
    first: itemsPerPage,
  };

  const { repository, loading, error, fetchMore } =
    useRepository(queryVariables);

  const onEndReach = () => {
    fetchMore();
  };

  if (loading) {
    return (
      <View style={styles.repoContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.repoContainer}>
        <Text>An Error Occurred</Text>
      </View>
    );
  }

  const ItemSeparator = () => <View style={styles.separator} />;

  const handleGithubButton = () => {
    Linking.openURL(repository.url);
  };

  const RepoInfo = () => {
    return (
      <>
        <View style={styles.repoContainer} testID="repositoryItem">
          <View style={styles.infoContainer}>
            <Image
              style={styles.avatar}
              src={repository.ownerAvatarUrl}
              testID="avatarImage"
            />
            <View style={styles.infoText}>
              <Text fontSize="subheading" fontWeight="bold" testID="fullName">
                {repository.fullName}
              </Text>
              <Text testID="description" color="textPrimaryOpacity">
                {repository.description}{" "}
              </Text>
              <Badge text={repository.language} />
            </View>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.stat}>
              <Text fontWeight="bold" testID="stargazersCount">
                {formatNumber(repository.stargazersCount)}
              </Text>
              <Text color="textPrimaryOpacity">Stars</Text>
            </View>

            <View style={styles.stat}>
              <Text fontWeight="bold" testID="forksCount">
                {formatNumber(repository.forksCount)}
              </Text>
              <Text color="textPrimaryOpacity">Forks</Text>
            </View>

            <View style={styles.stat}>
              <Text fontWeight="bold" testID="reviewCount">
                {formatNumber(repository.reviewCount)}
              </Text>
              <Text color="textPrimaryOpacity">Reviews</Text>
            </View>

            <View style={styles.stat}>
              <Text fontWeight="bold" testID="ratingAverage">
                {repository.ratingAverage}
              </Text>
              <Text color="textPrimaryOpacity">Rating</Text>
            </View>
          </View>
          <Pressable onPress={handleGithubButton}>
            <Button title="Open in Github" />
          </Pressable>
        </View>
        <ItemSeparator />
      </>
    );
  };

  const reviewNodes = repository
    ? repository.reviews.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={reviewNodes}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={RepoInfo}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
      renderItem={({ item }) => (
        <View style={styles.repoContainer}>
          <View style={styles.infoContainer}>
            <View style={styles.circle}>
              <Text fontWeight="bold" color="primary">
                {item.rating}
              </Text>
            </View>
            <View style={styles.reviewText}>
              <Text fontSize="subheading" fontWeight="bold">
                {item.user.username}
              </Text>
              <Text color="textPrimaryOpacity">
                {new Intl.DateTimeFormat("en-GB").format(
                  new Date(item.createdAt)
                )}
              </Text>
              <Text>{item.text}</Text>
            </View>
          </View>
        </View>
      )}
    ></FlatList>
  );
};

export default RepositoryView;
