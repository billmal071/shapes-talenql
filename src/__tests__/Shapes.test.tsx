import React from 'react';
import { render, fireEvent, screen } from "@testing-library/react";
import renderer from 'react-test-renderer';

import Shapes from '../components/shapes/Shapes';

/**
 * @jest-environment jsdom
 */

describe("< Shapes />", () => {
  test('purple checkbox value to change', () => {
    render(<Shapes />)
    const purple = screen.getByTestId("purple");
    expect(purple).toBeChecked();
    fireEvent.click(purple);
    expect(purple).not.toBeChecked();
  })

  test('triangle checkbox value to change', () => {
    render(<Shapes />)
    const triangle = screen.getByTestId("triangle");
    expect(triangle).toBeChecked();
    fireEvent.click(triangle);
    expect(triangle).not.toBeChecked();
  })
})