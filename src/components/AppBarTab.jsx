import { View, StyleSheet, Pressable } from "react-native";

import theme from "../theme";
import Text from "./Text";

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 5,
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
