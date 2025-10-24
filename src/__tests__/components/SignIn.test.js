import {
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react-native";
import { SignInFormContainer } from "../../components/SignIn";
// ...

describe("SignIn", () => {
  describe("SignInContainer", () => {
    it("calls onSubmit function with correct arguments when a valid form is submitted", async () => {
      const handleSubmit = jest.fn();

      render(<SignInFormContainer onSubmit={handleSubmit} />);

      const usernameTextInput = screen.getByTestId("username");
      const passwordTextInput = screen.getByTestId("password");
      const submitButton = screen.getByTestId("submit");

      fireEvent.changeText(usernameTextInput, "Thomas");
      fireEvent.changeText(passwordTextInput, "charlie");
      fireEvent.press(submitButton);

      await waitFor(() => {
        expect(handleSubmit).toHaveBeenCalledTimes(1);
        expect(handleSubmit.mock.calls[0][0]).toEqual({
          password: "charlie",
          username: "Thomas",
        });
      });
    });
  });
});
