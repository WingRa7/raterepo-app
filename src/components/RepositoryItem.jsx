import { View, StyleSheet, Image } from "react-native";
import theme from "../theme";
import Text from "./Text";
import Badge from "./Badge";

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
    <View style={styles.repoContainer}>
      <View style={styles.infoContainer}>
        <Image style={styles.avatar} src={ownerAvatarUrl} />
        <View style={styles.infoText}>
          <Text fontSize="subheading" fontWeight="bold">
            {fullName}
          </Text>
          <Text>{description} </Text>
          <Badge text={language} />
        </View>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.stat}>
          <Text fontWeight="bold">{stargazersCount}</Text>
          <Text>Stars</Text>
        </View>

        <View style={styles.stat}>
          <Text fontWeight="bold">{forksCount}</Text>
          <Text>Forks</Text>
        </View>

        <View style={styles.stat}>
          <Text fontWeight="bold">{reviewCount}</Text>
          <Text>Reviews</Text>
        </View>

        <View style={styles.stat}>
          <Text fontWeight="bold">{ratingAverage}</Text>
          <Text>Rating</Text>
        </View>
      </View>
    </View>
  );
};

export default RepositoryItem;
