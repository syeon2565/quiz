import { styled } from "@stitches/react";
import React from "react";

import Layout from "./Layout";

import useQuizStore from "~store/useStore";
import { Button } from "~styles/DS/Button/Button";

const Main = () => {
  const handleQuizStart = useQuizStore(state => state.startQuiz);

  return (
    <Layout dataTestid="main">
      <Title>Quiz</Title>
      <StyledButton onClick={handleQuizStart}>퀴즈풀기</StyledButton>
    </Layout>
  );
};

const Title = styled("div", {
  display: "flex",
  justifyContent: "center",
  fontSize: "100px",
});

const StyledButton = styled(Button, {
  margin: "100px",
});

export default Main;
