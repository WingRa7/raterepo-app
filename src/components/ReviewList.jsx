import { View, StyleSheet, FlatList } from "react-native";
import { useParams } from "react-router-native";
import theme from "../theme";
import Text from "./Text";
import { useQuery } from "@apollo/client";
import { GET_CURRENT_USER } from "../graphql/queries";

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

const ReviewList = () => {
  const { data, loading, error } = useQuery(GET_CURRENT_USER, {
    variables: { withReviews: true },
    fetchPolicy: "cache-and-network",
  });

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

  const reviews = data?.me?.reviews;

  const reviewNodes = reviews ? reviews.edges.map((edge) => edge.node) : [];

  return (
    <FlatList
      data={reviewNodes}
      ItemSeparatorComponent={ItemSeparator}
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

export default ReviewList;
