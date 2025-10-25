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
  repoContainer: {
    backgroundColor: theme.colors.cardBackground,
  },
  infoContainer: {
    flexDirection: "row",
  },
  infoText: {
    padding: 5,
    margin: 5,
    gap: 10,
  },
  avatar: {
    width: 45,
    height: 45,
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  statsContainer: {
    padding: 2,
    margin: 2,
    display: "flex",
    flexDirection: "row",
    gap: 5,
    justifyContent: "center",
  },
  stat: {
    padding: 5,
    margin: 5,
    display: "flex",
    alignItems: "center",
    gap: 5,
  },
});

const RepositoryView = () => {
  const { id } = useParams();
  const { repository, loading, error } = useRepository(id);

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

  const handleGithubButton = () => {
    Linking.openURL(repository.url);
  };

  const RepoInfo = () => {
    return (
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
            <Text testID="description">{repository.description} </Text>
            <Badge text={repository.language} />
          </View>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.stat}>
            <Text fontWeight="bold" testID="stargazersCount">
              {formatNumber(repository.stargazersCount)}
            </Text>
            <Text>Stars</Text>
          </View>

          <View style={styles.stat}>
            <Text fontWeight="bold" testID="forksCount">
              {formatNumber(repository.forksCount)}
            </Text>
            <Text>Forks</Text>
          </View>

          <View style={styles.stat}>
            <Text fontWeight="bold" testID="reviewCount">
              {formatNumber(repository.reviewCount)}
            </Text>
            <Text>Reviews</Text>
          </View>

          <View style={styles.stat}>
            <Text fontWeight="bold" testID="ratingAverage">
              {repository.ratingAverage}
            </Text>
            <Text>Rating</Text>
          </View>
        </View>
        <Pressable onPress={handleGithubButton}>
          <Button title="Open in Github" />
        </Pressable>
      </View>
    );
  };

  return <FlatList ListHeaderComponent={RepoInfo}></FlatList>;
};

export default RepositoryView;
