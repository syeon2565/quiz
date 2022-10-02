import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { screen, render } from "@testing-library/react";
import type { FC, PropsWithChildren } from "react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import Quiz from "~components/Quiz";
import data from "./data.json";

const queryClient = new QueryClient();

const wrapper: FC<PropsWithChildren> = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("Quiz test", () => {
  it("render title", async () => {
    render(<Quiz initialData={data} />, { wrapper });

    expect(
      screen.getByText("Q1 ) Which of these bones is hardest to break?"),
    ).toBeVisible();
  });

  it("render answer button", async () => {
    render(<Quiz initialData={data} />, { wrapper });

    expect(screen.getByText("Cranium")).toBeVisible();
    expect(screen.getByText("Humerus")).toBeVisible();
    expect(screen.getByText("Tibia")).toBeVisible();
    expect(screen.getByText("Femur")).toBeVisible();
  });

  it("render next button", async () => {
    render(<Quiz initialData={data} />, { wrapper });

    userEvent.click(screen.getAllByRole("button")[0]);
    expect(screen.getByText("NEXT")).toBeVisible();
  });
});
