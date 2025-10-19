import { Pressable, View, StyleSheet } from "react-native";
import theme from "../theme";
import Text from "./Text";

const styles = StyleSheet.create({
  primaryContainer: {
    alignItems: "center",
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    margin: 10,
    padding: 15,
  },
  primaryText: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSizes.subheading,
  },
});

const Button = ({ title, onPress }) => {
  return (
    <View style={styles.primaryContainer}>
      <Text style={styles.primaryText}>{title}</Text>
    </View>
  );
};

export default Button;
