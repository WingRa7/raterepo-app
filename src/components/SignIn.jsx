import { TextInput, Pressable, View, StyleSheet } from "react-native";
import { useFormik } from "formik";
import theme from "../theme";
import Text from "./Text";
import Button from "./Button";
import * as yup from "yup";
import useSignIn from "../hooks/useSignIn";

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
  inputError: {
    borderColor: theme.colors.error,
  },
});

const initialValues = {
  username: "",
  password: "",
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(4, "Username must atleast contain 4 characters")
    .required("Username is required"),
  password: yup
    .string()
    .min(4, "Password must atleast contain 4 characters")
    .required("Password is required"),
});

const SignInForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });
  return (
    <View style={styles.signinContainer}>
      <View style={styles.signinItems}>
        <TextInput
          style={[
            styles.input,
            formik.touched.username &&
              formik.errors.username &&
              styles.inputError,
          ]}
          placeholder="Username"
          value={formik.values.username}
          onChangeText={formik.handleChange("username")}
        />
        {formik.touched.username && formik.errors.username && (
          <Text style={{ color: theme.colors.error }}>
            {formik.errors.username}
          </Text>
        )}
        <TextInput
          style={[
            styles.input,
            formik.touched.password &&
              formik.errors.password &&
              styles.inputError,
          ]}
          secureTextEntry
          placeholder="Password"
          value={formik.values.password}
          onChangeText={formik.handleChange("password")}
        />
        {formik.touched.password && formik.errors.password && (
          <Text style={{ color: theme.colors.error }}>
            {formik.errors.password}
          </Text>
        )}
        <Pressable onPress={formik.handleSubmit}>
          <Button title="Submit" />
        </Pressable>
      </View>
    </View>
  );
};

const SignIn = () => {
  const [signIn] = useSignIn();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const { data } = await signIn({ username, password });
      console.log("login data:", data);
    } catch (e) {
      console.log("login error:", e);
    }
  };

  return <SignInForm onSubmit={onSubmit} />;
};

export default SignIn;
