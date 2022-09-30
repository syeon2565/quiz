import { render, screen } from "@testing-library/react";

import "@testing-library/jest-dom";
import Result from "~components/Result";

describe("Result test", () => {
  it("정답 갯수가 보인다", () => {
    render(<Result />);

    expect(screen.getByText(/^정답 \d+ 개$/)).toBeVisible();
  });

  it("오답 갯수가 보인다", () => {
    render(<Result />);

    expect(screen.getByText(/^오답 \d+ 개$/)).toBeVisible();
  });

  it("소요시간이 보인다", () => {
    render(<Result />);

    expect(screen.getByText(/^소요시간/)).toBeVisible();
  });

  it("다시 풀러가기 버튼이 보인다", () => {
    render(<Result />);

    expect(screen.getByText(/^다시 풀러가기/)).toBeVisible();
  });
});
