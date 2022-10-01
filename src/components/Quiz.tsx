/* eslint-disable react/no-array-index-key */
/* eslint-disable camelcase */
import { styled } from "@stitches/react";
import React, { useEffect, useState } from "react";

import Layout from "./Layout";
import Result from "./Result";

import useQuiz from "~hooks/useQuiz";
import useQuizStore from "~store/useStore";
import { Button } from "~styles/DS/Button/Button";

const Quiz = () => {
  const { quizData, quizLoading } = useQuiz();
  const handleNextBtn = useQuizStore(state => state.onNextQuiz);
  const onSubmit = useQuizStore(state => state.onSubmit);
  const currentNum = useQuizStore(state => state.currentQuizNum);

  const [currentQuestion, setCurrentQuestion] = useState("");
  const [answers, setAnswers] = useState<string[]>([]);

  const clicked = useQuizStore(state => state.clicked);
  const handleCheckAnswer = useQuizStore(state => state.checkedAnswer);
  const [randomIndex, setRandomIndex] = useState(0);

  useEffect(() => {
    if (quizData) {
      const { question, incorrect_answers, correct_answer } =
        quizData.data.results[currentNum];
      setCurrentQuestion(question);
      const clonedAnswer = [...incorrect_answers];
      const randomNumber = Math.floor(Math.random() * 4);
      setRandomIndex(randomNumber);
      clonedAnswer.splice(randomNumber, 0, correct_answer);
      setAnswers(clonedAnswer);
    }
  }, [quizData, currentNum, quizLoading]);

  return (
    <Layout dataTestid="quiz">
      {quizLoading ? (
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
                  onClick={() => {
                    handleCheckAnswer(i, randomIndex);
                  }}
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
