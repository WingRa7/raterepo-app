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
    <View style={styles.container}>
      <Pressable>
        <Text color="textSecondary" fontSize="subheading" fontWeight="bold">
          {title}
        </Text>
      </Pressable>
    </View>
  );
};

export default AppBarTab;
