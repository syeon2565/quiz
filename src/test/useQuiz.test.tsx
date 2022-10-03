import { renderHook, waitFor } from "@testing-library/react";

import useQuiz from "~hooks/useQuiz";
import { wrapper } from "./Quiz.test";
import "@testing-library/jest-dom";

describe("Quiz test", () => {
  it("success query hook", async () => {
    const { result } = renderHook(() => useQuiz(), { wrapper });

    // 직접 api를 찌르기 때문에 timeout을 주어 해결
    await waitFor(() => expect(result.current.isSuccess).toBe(true), {
      timeout: 5000,
    });
    // 데이터가 계속 바뀌므로 데이터여부만 체크하는것으로..데이터를 잘가지고오는지 판단
    await waitFor(() => expect(result.current.quizData).not.toBeUndefined());
  });

  it("failure query hook", async () => {
    const { result } = renderHook(() => useQuiz(), { wrapper });

    // 직접 api를 찌르기 때문에 timeout을 주어 해결하려했으나 5초가 넘어가버린다.
    await waitFor(() => expect(result.current.quizError).toBe(true), {
      timeout: 5000,
    });

    expect(result.current.error).toBeDefined();
  });
});
