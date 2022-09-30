import { render, screen } from "@testing-library/react";

import Layout from "~components/Layout";
import "@testing-library/jest-dom";

describe("Layout test", () => {
  it("render children", () => {
    render(<Layout>test</Layout>);

    expect(screen.getByText("test")).toBeVisible();
  });
});
