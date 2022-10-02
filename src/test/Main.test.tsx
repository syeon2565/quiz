import { render, screen } from "@testing-library/react";

import Main from "~components/Main";
import "@testing-library/jest-dom";

describe("Main test", () => {
  it("render title", () => {
    render(<Main />);

    expect(screen.getByText("Quiz")).toBeVisible();
  });

  it("render start button", () => {
    render(<Main />);

    expect(screen.getByText("퀴즈풀기")).toBeVisible();
  });
});
