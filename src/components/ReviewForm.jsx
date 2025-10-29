import { TextInput, Pressable, View, StyleSheet } from "react-native";
import { AutoGrowingTextInput } from "react-native-autogrow-textinput";
import { useFormik } from "formik";
import theme from "../theme";
import Text from "./Text";
import Button from "./Button";
import * as yup from "yup";

import { useNavigate } from "react-router-native";
import useCreateReview from "../hooks/useCreateReview";

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
  repoOwner: "",
  repoName: "",
  rating: "",
  review: "",
};

const validationSchema = yup.object().shape({
  repoOwner: yup
    .string()
    .min(1, "Repository owner name must contain atleast 1 character")
    .required("Repository owner name is required"),
  repoName: yup
    .string()
    .min(1, "Repository name must contain atleast 1 characters")
    .required("Repository name is required"),
  rating: yup
    .number()
    .typeError("Rating must be a number")
    .min(0, "Rating must be between 0 and 100")
    .max(100, "Rating must be between 0 and 100")
    .required("Rating is required"),
  review: yup.string(),
});

const ReviewForm = () => {
  const navigate = useNavigate();

  const [submitReview] = useCreateReview();

  const onSubmit = async (values) => {
    const { repoOwner, repoName, rating, review } = values;

    try {
      const { data } = await submitReview({
        repoOwner,
        repoName,
        rating,
        review,
      });
      navigate(`/${data.createReview.repositoryId}`);
    } catch (e) {
      console.log("submit review error:", e);
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
              formik.touched.repoOwner &&
                formik.errors.repoOwner &&
                styles.inputError,
            ]}
            placeholder="Repository owner name"
            value={formik.values.repoOwner}
            onChangeText={formik.handleChange("repoOwner")}
            onBlur={formik.handleBlur("repoOwner")}
          />
          {formik.touched.repoOwner && formik.errors.repoOwner && (
            <Text style={styles.validationErrorText}>
              {formik.errors.repoOwner}
            </Text>
          )}
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={[
              styles.input,
              formik.touched.repoName &&
                formik.errors.repoName &&
                styles.inputError,
            ]}
            placeholder="Repository Name"
            value={formik.values.repoName}
            onChangeText={formik.handleChange("repoName")}
            onBlur={formik.handleBlur("repoName")}
          />
          {formik.touched.repoName && formik.errors.repoName && (
            <Text style={styles.validationErrorText}>
              {formik.errors.repoName}
            </Text>
          )}
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={[
              styles.input,
              formik.touched.rating &&
                formik.errors.rating &&
                styles.inputError,
            ]}
            placeholder="Rating between 0 and 100"
            value={formik.values.rating}
            onChangeText={formik.handleChange("rating")}
            onBlur={formik.handleBlur("rating")}
          />
          {formik.touched.rating && formik.errors.rating && (
            <Text style={styles.validationErrorText}>
              {formik.errors.rating}
            </Text>
          )}
        </View>

        <View style={styles.inputContainer}>
          <AutoGrowingTextInput
            style={[
              styles.input,
              formik.touched.review &&
                formik.errors.review &&
                styles.inputError,
            ]}
            placeholder={"Review"}
            value={formik.values.review}
            onChangeText={formik.handleChange("review")}
            onBlur={formik.handleBlur("review")}
          />
          {formik.touched.review && formik.errors.review && (
            <Text style={styles.validationErrorText}>
              {formik.errors.review}
            </Text>
          )}
        </View>

        <Pressable onPress={formik.handleSubmit}>
          <Button title="Create a review" />
        </Pressable>
      </View>
    </View>
  );
};

export default ReviewForm;
