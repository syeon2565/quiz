import type { NextPage } from "next";
import { Button } from "../styles/DS/Button/Button";
import { styled } from "@stitches/react";
import Layout from "../components/Layout";

const Home: NextPage = () => {
  return (
    <Layout>
      <Title>Quiz</Title>
      <StyledButton>퀴즈풀기</StyledButton>
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

export default Home;
