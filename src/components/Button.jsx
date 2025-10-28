import { View, StyleSheet } from "react-native";
import theme from "../theme";
import Text from "./Text";

const styles = StyleSheet.create({
  primary: {
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
  warning: {
    alignItems: "center",
    backgroundColor: theme.colors.error,
    borderRadius: 5,
    margin: 10,
    padding: 15,
  },
  warningText: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSizes.subheading,
  },
});

const Button = ({ title, type }) => {
  const buttonStyle = [styles.primary, type === "warning" && styles.warning];
  const textStyle = [
    styles.primaryText,
    type === "warning" && styles.warningText,
  ];

  return (
    <View style={buttonStyle}>
      <Text style={textStyle}>{title}</Text>
    </View>
  );
};

export default Button;
