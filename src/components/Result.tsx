import React from "react";
import Layout from "./Layout";
import { styled } from "@stitches/react";
import useQuizStore from "../store/useStore";
import { RadialChart } from "react-vis";
import { Button } from "../styles/DS/Button/Button";

const Result = () => {
  const score = useQuizStore(state => state.score);
  const startTime = useQuizStore(state => state.startTime) as Date;
  const endTime = useQuizStore(state => state.endTime) as Date;
  const handleQuizStart = useQuizStore(state => state.ReStartQuiz);

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
      <RadialChart data={data} width={250} height={250} showLabels={true} />
      <Button onClick={handleQuizStart}>다시 풀러가기</Button>
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

export default Result;
