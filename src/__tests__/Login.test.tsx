import React from 'react';
import { render, fireEvent } from "@testing-library/react";
import renderer from 'react-test-renderer';

import Login from '../components/login/Login';

/**
 * @jest-environment jsdom
 */

describe("<Login />", () => {
  test("should display a login form", async () => {
    const { findByTestId } = render(<Login />);
    const loginForm = await findByTestId("loginForm");

    expect(loginForm).toHaveFormValues({
      username: "Test1",
      password: "TalentQL",
    })
  })

  test("should allow entering a username", async () => {
    const { getByTestId } = render(<Login />);

    fireEvent.change(getByTestId("username"), { target: { value: "Test1" } })

    expect(getByTestId("username")).toHaveValue("Test1")
  })

  test("should allow entering a password", async () => {
    const { getByTestId, findByRole } = render(<Login />);

    fireEvent.change(getByTestId("password"), { target: { value: "TalentQL" } })

    expect(getByTestId("password")).toHaveValue("TalentQL")
  })

  test("should submit the form with username and password", async () => {
    const handleSubmit = jest.fn();
    const { getByTestId } = render(<Login />);
    const { getInstance, toJSON } = renderer.create(<Login />);

    let tree = toJSON();
    expect(tree).toMatchSnapshot();

    fireEvent.change(getByTestId("username"), { target: { value: "Test1" } })
    fireEvent.change(getByTestId("password"), { target: { value: "TalentQL" } })
    fireEvent.click(getByTestId("submit"))

    expect(getByTestId("submit")).toBeEnabled()
  })
})