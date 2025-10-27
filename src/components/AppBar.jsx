import { View, StyleSheet, ScrollView, Pressable } from "react-native";
import { Link } from "react-router-native";
import Constants from "expo-constants";

import theme from "../theme";
import AppBarTab from "./AppBarTab";

import { useQuery } from "@apollo/client";
import { GET_CURRENT_USER } from "../graphql/queries";

import useAuthStorage from "../hooks/useAuthStorage";
import { useApolloClient } from "@apollo/client";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    display: "flex",
    flexDirection: "row",
    backgroundColor: theme.colors.appBarBackground,
  },
  text: {
    color: theme.colors.textSecondary,
  },
});

const AppBar = () => {
  const { data, error, loading } = useQuery(GET_CURRENT_USER);
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const handleSignOut = async () => {
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
  };

  if (loading) {
    return <View style={styles.container} />;
  }

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Link to="/">
          <AppBarTab title={"Repositories"} />
        </Link>
        {data.me && data && (
          <Link to="/review">
            <AppBarTab title={"Create a review"} />
          </Link>
        )}
        {!data.me && data && (
          <Link to="/signin">
            <AppBarTab title={"Sign In"} />
          </Link>
        )}
        {!data.me && data && (
          <Link to="/signup">
            <AppBarTab title={"Sign Up"} />
          </Link>
        )}
        {data.me && data && (
          <Pressable onPress={handleSignOut}>
            <AppBarTab title={"Sign Out"} onPressFunction={handleSignOut} />
          </Pressable>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
