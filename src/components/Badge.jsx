import { View, StyleSheet } from "react-native";
import theme from "../theme";
import Text from "./Text";

const styles = StyleSheet.create({
  badge: {
    backgroundColor: theme.colors.blue,
    borderRadius: 5,
    padding: 5,
    alignSelf: "flex-start",
  },
});

const Badge = ({ text }) => {
  return (
    <View style={styles.badge}>
      <Text color="textSecondary">{text}</Text>
    </View>
  );
};

export default Badge;
