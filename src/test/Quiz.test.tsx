import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { screen, render } from "@testing-library/react";
import type { FC, PropsWithChildren } from "react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import Quiz from "~components/Quiz";
import data from "./mock/data.json";
import { server } from "./mock/server";
import { rest } from "msw";

const queryClient = new QueryClient();

export const wrapper: FC<PropsWithChildren> = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("initial Data있을 때 퀴즈 테스트", () => {
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

  it("정답 버튼 4개가 보인다.", async () => {
    server.use(
      rest.get("/", (req, res, ctx) => {
        return res(ctx.delay(3000), ctx.status(200), ctx.json(data));
      }),
    );
    render(<Quiz />, { wrapper });

    expect(screen.getByText("Cranium")).toBeVisible();
    expect(screen.getByText("Humerus")).toBeVisible();
    expect(screen.getByText("Tibia")).toBeVisible();
    expect(screen.getByText("Femur")).toBeVisible();
  });
});

describe("initialData가 없을 때 퀴즈 테스트", () => {
  it("initialData가 없을 때 퀴즈 질문이 보인다", async () => {
    server.use(
      rest.get("/", (req, res, ctx) => {
        return res(ctx.delay(3000), ctx.status(200), ctx.json(data));
      }),
    );
    render(<Quiz />, { wrapper });

    expect(
      screen.getByText("Q1 ) Which of these bones is hardest to break?"),
    ).toBeVisible();
  });

  it("initialData가 정답을 클릭하면 NEXT버튼이 보인다.", async () => {
    server.use(
      rest.get("/", (req, res, ctx) => {
        return res(ctx.delay(3000), ctx.status(200), ctx.json(data));
      }),
    );
    render(<Quiz />, { wrapper });

    userEvent.click(screen.getAllByRole("button")[0]);
    expect(screen.getByText("NEXT")).toBeVisible();
  });
});
