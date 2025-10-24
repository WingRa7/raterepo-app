import { View, StyleSheet, Pressable } from "react-native";

import theme from "../theme";
import Text from "./Text";

const styles = StyleSheet.create({
  container: {
    padding: 10,
    margin: 10,
  },
  text: {
    color: theme.colors.textSecondary,
  },
});

const AppBarTab = ({ title }) => {
  return (
    <>
      <View style={styles.container}>
        <Text color="textSecondary" fontSize="subheading" fontWeight="bold">
          {title}
        </Text>
      </View>
    </>
  );
};

export default AppBarTab;
