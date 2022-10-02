/* eslint-disable react/no-array-index-key */
/* eslint-disable camelcase */
import { styled } from "@stitches/react";
import React, { FC, useEffect, useState } from "react";
import { decode } from "html-entities";
import Layout from "./Layout";
import Result from "./Result";

import useQuiz, { Quizzes } from "~hooks/useQuiz";
import useQuizStore from "~store/useStore";
import { Button } from "~styles/DS/Button/Button";

type QuizProps = {
  initialData?: Quizzes;
};

const Quiz: FC<QuizProps> = ({ initialData }) => {
  const { quizData, quizLoading, isFetching } = useQuiz(initialData);
  const handleNextBtn = useQuizStore(state => state.onNextQuiz);
  const onSubmit = useQuizStore(state => state.onSubmit);
  const currentNum = useQuizStore(state => state.currentQuizNum);

  const [currentQuestion, setCurrentQuestion] = useState("");
  const [answers, setAnswers] = useState<string[]>([]);

  const clicked = useQuizStore(state => state.clicked);
  const checkedAnswer = useQuizStore(state => state.checkedAnswer);
  const [randomIndex, setRandomIndex] = useState(0);

  useEffect(() => {
    if (quizData) {
      const { question, incorrect_answers, correct_answer } =
        quizData.results[currentNum];
      setCurrentQuestion(decode(question));
      const clonedAnswer = [...incorrect_answers];
      const randomNumber = Math.floor(Math.random() * 4);
      setRandomIndex(randomNumber);
      clonedAnswer.splice(randomNumber, 0, correct_answer);
      setAnswers(clonedAnswer.map(a => decode(a)));
    }
  }, [quizData, currentNum]);

  answers.map((a, i) =>
    localStorage.setItem(`Q${currentNum + 1} answer ${i + 1}`, a),
  );
  localStorage.setItem(`Q${currentNum + 1} answer`, `${randomIndex + 1}`);

  const handleCheckAnswer = (i: number, randomIndex: number) => {
    checkedAnswer(i, randomIndex);
    if (i != randomIndex) {
      localStorage.setItem(`question${currentNum + 1}`, currentQuestion);
    }
  };

  return (
    <Layout dataTestid="quiz">
      {quizLoading || isFetching ? (
        "Loading..."
      ) : (
        <>
          {currentNum >= 10 ? (
            <Result />
          ) : (
            <>
              <QuizTitle>{`Q${currentNum + 1} ) ${currentQuestion}`}</QuizTitle>
              {answers?.map((answer, i) => (
                <StyledButton
                  buttonType={clicked ? "disabled" : "outlined"}
                  size="small"
                  disabled={clicked}
                  onClick={() => handleCheckAnswer(i, randomIndex)}
                  key={i}
                >
                  {answer}
                </StyledButton>
              ))}

              {clicked && (
                <NextButton
                  buttonType="filled"
                  onClick={currentNum >= 9 ? onSubmit : handleNextBtn}
                >
                  {currentNum >= 9 ? "SUBMIT" : "NEXT"}
                </NextButton>
              )}
            </>
          )}
        </>
      )}
    </Layout>
  );
};

const QuizTitle = styled("div", {
  margin: "80px 0",
});

const StyledButton = styled(Button, {
  margin: "10px",
  variants: {
    checkAnswer: {
      wrong: { color: "red" },
      answer: { color: "blue" },
    },
  },
});

const NextButton = styled(Button, {
  marginTop: "80px",
});

export default Quiz;
