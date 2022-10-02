import { styled } from "@stitches/react";
import React from "react";
import { RadialChart } from "react-vis";

import Layout from "./Layout";

import useQuizStore from "~store/useStore";
import { Button } from "~styles/DS/Button/Button";

const Result = () => {
  const score = useQuizStore(state => state.score);
  const startTime = useQuizStore(state => state.startTime) as Date;
  const endTime = useQuizStore(state => state.endTime) as Date;
  const handleQuizStart = useQuizStore(state => state.ReStartQuiz);
  const wrongNumber = useQuizStore(state => state.wrongNumber);
  const answerNum = [1, 2, 3, 4];

  const data = [
    { angle: score, label: "정답" },
    { angle: 10 - score, label: "오답" },
  ];

  return (
    <Layout dataTestid="result">
      <Div color="answer">정답 {score} 개</Div>
      <Div color="wrong">오답 {10 - score} 개</Div>
      <Div color="time">
        소요시간 {Math.floor((+endTime - +startTime) / 1000)} 초
      </Div>
      <RadialChart data={data} width={250} height={250} showLabels />
      <Button onClick={handleQuizStart}>다시 풀러가기</Button>
      <Header>오답 노트</Header>
      {wrongNumber?.map((questionNum, i) => (
        <WrongAnswerNotes key={i}>
          <Question>
            Q{questionNum}) {localStorage.getItem(`question${questionNum}`)}
          </Question>
          {answerNum.map((answerNum, i) => (
            <Answer key={i}>
              {answerNum}) &nbsp;
              {localStorage.getItem(`Q${questionNum} answer ${answerNum}`)}
            </Answer>
          ))}
          <AnswerNum>
            정답 : {localStorage.getItem(`Q${questionNum + 1} answer`)}
          </AnswerNum>
        </WrongAnswerNotes>
      ))}
    </Layout>
  );
};

const Div = styled("div", {
  fontSize: "22px",
  variants: {
    color: {
      answer: { color: "#4643ff" },
      wrong: { color: "#ff4747" },
      time: { color: "#414141" },
    },
  },
});

const Header = styled("h1", {
  padding: "20px",
});

const WrongAnswerNotes = styled("div", {
  display: "flex",
  padding: "20px",
  width: "300px",
  margin: "2px",
  backgroundColor: "#c9b3ff38",
  borderRadius: "6px",
  fontSize: "14px",
  flexDirection: "column",
});

const Question = styled("div", {
  padding: "10px 0",
});

const Answer = styled("div", {
  fontSize: "10px",
});

const AnswerNum = styled("div", {
  margin: "auto 0 0 auto",
  fontSize: "12px",
  color: "#356bff",
});

export default Result;
