import { TextInput, Pressable, View, StyleSheet } from "react-native";
import { useFormik } from "formik";
import theme from "../theme";
import Text from "./Text";
import Button from "./Button";

const styles = StyleSheet.create({
  signinContainer: {
    backgroundColor: theme.colors.cardBackground,
    flexDirection: "column",
  },
  signinItems: {
    padding: 10,
    margin: 5,
  },
  input: {
    height: 40,
    margin: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: theme.colors.border,
    padding: 10,
  },
});

const initialValues = {
  username: "",
  password: "",
};

const SignInForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    onSubmit,
  });
  return (
    <View style={styles.signinContainer}>
      <View style={styles.signinItems}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={formik.values.username}
          onChangeText={formik.handleChange("username")}
        />
        <TextInput
          style={styles.input}
          secureTextEntry
          placeholder="Password"
          value={formik.values.password}
          onChangeText={formik.handleChange("password")}
        />
        <Pressable onPress={formik.handleSubmit}>
          <Button title="Submit" />
        </Pressable>
      </View>
    </View>
  );
};

const SignIn = () => {
  const onSubmit = (values) => {
    console.log(values);
  };

  return <SignInForm onSubmit={onSubmit} />;
};

export default SignIn;
