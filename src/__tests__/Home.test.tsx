// src/__tests__/Home.test.tsx
import React from "react";
import Home from "@/app/page";
import { render, screen } from "@testing-library/react";

describe("Home Component", () => {
  it("should render the welcome message", () => {
    render(<Home />);
    const heading = screen.getByText(/Welcome to My App k/i);
    expect(heading).toBeInTheDocument();
  });

  it('should render the "Hello world" text', () => {
    render(<Home />);
    const text = screen.getByText(/Hello world/i);
    expect(text).toBeInTheDocument();
  });

  it("should render the footer content", () => {
    render(<Home />);
    const footerText = screen.getByText(/Footer content/i);
    expect(footerText).toBeInTheDocument();
  });
});
