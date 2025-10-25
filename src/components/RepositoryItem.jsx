import { View, StyleSheet, Image } from "react-native";
import theme from "../theme";
import Text from "./Text";
import Badge from "./Badge";

const styles = StyleSheet.create({
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
});

const RepositoryItem = ({
  fullName,
  description,
  language,
  forksCount,
  stargazersCount,
  ratingAverage,
  reviewCount,
  ownerAvatarUrl,
}) => {
  return (
    <View style={styles.repoContainer} testID="repositoryItem">
      <View style={styles.infoContainer}>
        <Image
          style={styles.avatar}
          src={ownerAvatarUrl}
          testID="avatarImage"
        />
        <View style={styles.infoText}>
          <Text fontSize="subheading" fontWeight="bold" testID="fullName">
            {fullName}
          </Text>
          <Text testID="description" color="textPrimaryOpacity">
            {description}{" "}
          </Text>
          <Badge text={language} />
        </View>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.stat}>
          <Text fontWeight="bold" testID="stargazersCount">
            {stargazersCount}
          </Text>
          <Text color="textPrimaryOpacity">Stars</Text>
        </View>

        <View style={styles.stat}>
          <Text fontWeight="bold" testID="forksCount">
            {forksCount}
          </Text>
          <Text color="textPrimaryOpacity">Forks</Text>
        </View>

        <View style={styles.stat}>
          <Text fontWeight="bold" testID="reviewCount">
            {reviewCount}
          </Text>
          <Text color="textPrimaryOpacity">Reviews</Text>
        </View>

        <View style={styles.stat}>
          <Text fontWeight="bold" testID="ratingAverage">
            {ratingAverage}
          </Text>
          <Text color="textPrimaryOpacity">Rating</Text>
        </View>
      </View>
    </View>
  );
};

export default RepositoryItem;
