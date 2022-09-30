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

type Quizzes = {
  response_code: number;
  results: Quiz[];
};

const getQuizs = async () => {
  try {
    const res = await Axios.get("?amount=10&type=multiple");
    return res;
  } catch (e) {
    alert(e);
  }
};

const useQuiz = () => {
  const {
    data: quizData,
    isLoading: quizLoading,
    isError: quizError,
    ...rest
  } = useQuery(["?amount=10&type=multiple"], getQuizs, {
    refetchOnWindowFocus: false,
  });

  return {
    quizData,
    quizLoading,
    quizError,
    ...rest,
  };
};

export default useQuiz;
