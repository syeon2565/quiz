import type { NextPage } from "next";

import Main from "~components/Main";
import Quiz from "~components/Quiz";
import Result from "~components/Result";
import useQuizStore from "~store/useStore";

const Home: NextPage = () => {
  const gameStatus = useQuizStore(state => state.getGameStatus());

  switch (gameStatus) {
    case "notStarted":
      return <Main />;
    case "playing":
      return <Quiz />;
    case "ended":
      return <Result />;
    default:
      throw Error("something went wrong");
  }
};

export default Home;
