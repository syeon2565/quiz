import { useQuery } from "@tanstack/react-query";

type Quiz = {
  category: string;
  type: string;
  question: string;
  difficulty: string;
  correct_answer: string;
  incorrect_answers: string[];
};

type Quizzes = {
  response_code: number;
  results: Quiz[];
};

const useQuiz = () => {
  const {
    data: quizData,
    isLoading: quizLoading,
    isError: quizError,
  } = useQuery<Quizzes>(["?amount=10&type=multiple"], {
    refetchOnWindowFocus: false,
  });

  return {
    quizData,
    quizLoading,
    quizError,
  };
};

export default useQuiz;
