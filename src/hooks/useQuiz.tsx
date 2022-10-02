/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useQuery } from "@tanstack/react-query";

import Axios from "~lib/Axios";

type Quiz = {
  category: string;
  type: string;
  question: string;
  difficulty: string;
  correct_answer: string;
  incorrect_answers: string[];
};

export type Quizzes = {
  response_code: number;
  results: Quiz[];
};

export const getQuizzes = async (): Promise<Quizzes> => {
  const res = await Axios.get<Quizzes>("?amount=10&type=multiple");
  return res.data;
};

const useQuiz = (initialData: Quizzes) => {
  const {
    data: quizData,
    isLoading: quizLoading,
    isError: quizError,
    ...rest
  } = useQuery<Quizzes>(["quiz"], getQuizzes, {
    initialData,
    staleTime: 1000,
  });

  return {
    quizData,
    quizLoading,
    quizError,
    ...rest,
  };
};

export default useQuiz;
