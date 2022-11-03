import { render, screen, fireEvent } from "@testing-library/react";
import SignIn from "./SignIn";
import Dashboard from "./Dashboard";
import { getUsers } from "../data/repository";


// See here for more information:
// https://reactjs.org/docs/testing.html
// https://github.com/testing-library/react-testing-library
// https://testing-library.com/docs/
// https://testing-library.com/docs/react-testing-library/intro

// Global data for tests.
let users;
let container;

const setup = () => render(<SignIn/>);

// Runs once before tests, here global test data is initialised.
beforeAll(() => {

});

// Runs before each test, here the Users component is rendered and the container is stored.
beforeEach(() => {

});

test("Search input then submit", () => {
  // const utils = setup();
  // container = utils.container;
  setup();
  // const username_input = screen.getByLabelText("Username");
  // const email_input = screen.getByLabelText("Email");
  // const password_input = screen.getByLabelText("Password");
  // const confirm_password_input = screen.getByLabelText("Confirm Password");
  // const button = screen.getByDisplayValue("Submit");

  // // Simulate input.
  // fireEvent.change(username_input, { target: { value: "Test User" } });
  // fireEvent.change(email_input, { target: { value: "test@gmail.com" } });
  // fireEvent.change(password_input, { target: { value: "Test123!" } });
  // fireEvent.change(confirm_password_input, { target: { value: "Test123!" } });

  // expect(username_input.value).toBe("Test User");
  // expect(email_input.value).toBe("test@gmail.com");
  // expect(password_input.value).toBe("Test123!");
  // expect(confirm_password_input.value).toBe("Test123!");

  // // Simulate click.
  // fireEvent.click(button);

});

