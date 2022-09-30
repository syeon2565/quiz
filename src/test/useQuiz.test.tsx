import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { FC, PropsWithChildren } from "react";
import useQuiz from "~hooks/useQuiz";

const queryClient = new QueryClient();

const wrapper: FC<PropsWithChildren> = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("Quiz test", () => {
  it("success query hook", async () => {
    const { result } = renderHook(() => useQuiz(), { wrapper });

    //TODO ) 간헐적으로 toBe(true)아닌 경우가 나온다..
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    //데이터가 계속 바뀌므로 데이터여부만 체크하는것으로..데이터를 잘가지고오는지 판단
    await waitFor(() => expect(result.current.quizData).not.toBeUndefined());
  });
  it("failure query hook", async () => {
    const { result } = renderHook(() => useQuiz(), { wrapper });
    //에러가 트루면
    await waitFor(() => expect(result.current.quizError).toBe(true));

    expect(result.current.error).toBeDefined();
  });
});
