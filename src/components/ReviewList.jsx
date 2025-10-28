import { View, StyleSheet, FlatList, Pressable, Alert } from "react-native";
import theme from "../theme";
import Text from "./Text";
import Button from "./Button";
import { useQuery } from "@apollo/client";
import { GET_CURRENT_USER } from "../graphql/queries";
import { useNavigate } from "react-router-native";
import useDeleteReview from "../hooks/useDeleteReview";

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
  buttonsView: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },
});

const ReviewList = () => {
  const navigate = useNavigate();
  const [submitDeleteReview] = useDeleteReview();

  const { data, loading, error, refetch } = useQuery(GET_CURRENT_USER, {
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

  const handleViewRepo = (repoId) => {
    navigate(`/${repoId}`);
  };

  const handleDelete = async (id) => {
    // need to now revalidate or remove data from cache - review still shows.
    // also need to make pop up to confirm delete or not and test on mobile app
    Alert.alert(
      "Delete Review",
      "Are you sure you want to delete this review?",
      [
        {
          text: "OK",
          onPress: async () => {
            try {
              const { data } = await submitDeleteReview(id);
              refetch();
            } catch (e) {
              console.log("attempt to delete review error:", e);
            }
          },
          style: "destructive",
        },
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
      ]
    );
  };

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
          <View style={styles.buttonsView}>
            <Pressable onPress={() => handleViewRepo(item.repositoryId)}>
              <Button type="primary" title="View repository" />
            </Pressable>
            <Pressable onPress={() => handleDelete(item.id)}>
              <Button type="warning" title="Delete review" />
            </Pressable>
          </View>
        </View>
      )}
    ></FlatList>
  );
};

export default ReviewList;
