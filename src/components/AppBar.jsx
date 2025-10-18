import { View, StyleSheet, ScrollView } from "react-native";
import { Link } from "react-router-native";
import Constants from "expo-constants";

import theme from "../theme";
import AppBarTab from "./AppBarTab";

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
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Link to="/">
          <AppBarTab title={"Repositories"} />
        </Link>
        <Link to="/signin">
          <AppBarTab title={"Sign In"} />
        </Link>
      </ScrollView>
    </View>
  );
};

export default AppBar;
