import { useQuery } from "@tanstack/react-query";

type QuizState = {
  quizData: unknown;
  quizLoading: boolean;
  quizError: unknown;
};

const useQuiz = () => {
  const {
    data: quizData,
    isLoading: quizLoading,
    error: quizError,
  } = useQuery(["?amount=10"], {
    refetchOnWindowFocus: false,
  });

  return {
    quizData,
    quizLoading,
    quizError,
  };
};

export default useQuiz;
