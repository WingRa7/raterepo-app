import { StyleSheet, View } from "react-native";
import { Route, Routes, Navigate } from "react-router-native";

import RepositoryList from "./RepositoryList";
import AppBar from "./AppBar";
import theme from "../theme";
import SignIn from "./SignIn";
import RepositoryView from "./RepositoryView";
import ReviewForm from "./ReviewForm";
import SignUpForm from "./SignUpForm";
import ReviewList from "./ReviewList";

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.mainBackground,
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/:id" element={<RepositoryView />} />
        <Route path="/review" element={<ReviewForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/reviews" element={<ReviewList />} />
      </Routes>
    </View>
  );
};

export default Main;
