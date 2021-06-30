import React from 'react';
import { render, fireEvent, waitFor } from "@testing-library/react";

import Login from '../components/login/Login';

describe("<Login />", () => {
  test("should display a login form", async () => {
    expect(Login).toHaveFormValues({
      username: "Test1",
      password: "TalentQL"
    })
  })
})