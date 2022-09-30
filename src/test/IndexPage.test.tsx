import { QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { queryClient } from "~pages/_app";
import Index from "~pages/index";
import "@testing-library/jest-dom";

describe("Index page test", () => {
  it("처음에 메인 컴포넌트가 보인다", () => {
    render(<Index />);

    expect(screen.getByTestId("main")).toBeVisible();
  });

  it("버튼 클릭 시 퀴즈 컴포넌트로 바뀐다", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Index />
      </QueryClientProvider>,
    );

    userEvent.click(screen.getByText("퀴즈풀기"));
    expect(screen.getByTestId("quiz")).toBeVisible();
  });
});
