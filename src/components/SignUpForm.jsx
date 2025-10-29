import { TextInput, Pressable, View, StyleSheet } from "react-native";
import { useFormik } from "formik";
import theme from "../theme";
import Text from "./Text";
import Button from "./Button";
import * as yup from "yup";

import { useNavigate } from "react-router-native";
import useCreateUser from "../hooks/useCreateUser";
import useSignIn from "../hooks/useSignIn";

const styles = StyleSheet.create({
  signinContainer: {
    backgroundColor: theme.colors.cardBackground,
  },
  inputItems: {
    padding: 10,
    margin: 5,
  },
  inputContainer: {
    margin: 5,
    gap: 5,
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: theme.colors.border,
    padding: 10,
    margin: 5,
    textAlignVertical: "top",
  },
  inputError: {
    borderColor: theme.colors.error,
  },
  validationErrorText: {
    marginLeft: 10,
    color: theme.colors.error,
  },
});

const initialValues = {
  username: "",
  password: "",
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(1, "Username must contain atleast 1 character")
    .required("Username is required"),
  password: yup
    .string()
    .min(1, "Password must contain atleast 1 characters")
    .required("Password is required"),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "Password must match")
    .required("Password confirmation is required"),
});

const SignUpForm = () => {
  const navigate = useNavigate();

  const [submitCreateUser] = useCreateUser();
  const [signIn] = useSignIn();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const { data } = await submitCreateUser({
        username,
        password,
      });
      try {
        const { data } = await signIn({ username, password });
        navigate("/");
      } catch (e) {
        console.log("login error:", e);
      }
    } catch (e) {
      console.log("submit create user error:", e);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
    validateOnChange: true,
    validateOnBlur: true,
  });

  return (
    <View style={styles.signinContainer}>
      <View style={styles.inputItems}>
        <View style={styles.inputContainer}>
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
            onBlur={formik.handleBlur("username")}
          />
          {formik.touched.username && formik.errors.username && (
            <Text style={styles.validationErrorText}>
              {formik.errors.username}
            </Text>
          )}
        </View>

        <View style={styles.inputContainer}>
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
            onBlur={formik.handleBlur("password")}
          />
          {formik.touched.password && formik.errors.password && (
            <Text style={styles.validationErrorText}>
              {formik.errors.password}
            </Text>
          )}
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={[
              styles.input,
              formik.touched.passwordConfirmation &&
                formik.errors.passwordConfirmation &&
                styles.inputError,
            ]}
            secureTextEntry
            placeholder="Password confirmation"
            value={formik.values.passwordConfirmation}
            onChangeText={formik.handleChange("passwordConfirmation")}
            onBlur={formik.handleBlur("passwordConfirmation")}
          />
          {formik.touched.passwordConfirmation &&
            formik.errors.passwordConfirmation && (
              <Text style={styles.validationErrorText}>
                {formik.errors.passwordConfirmation}
              </Text>
            )}
        </View>

        <Pressable onPress={formik.handleSubmit}>
          <Button title="Sign up" />
        </Pressable>
      </View>
    </View>
  );
};

export default SignUpForm;
