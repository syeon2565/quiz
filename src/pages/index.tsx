import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";

import Main from "~components/Main";
import Quiz from "~components/Quiz";
import Result from "~components/Result";
import { getQuizzes, type Quizzes } from "~hooks/useQuiz";
import useQuizStore from "~store/useStore";

export const getServerSideProps: GetServerSideProps<{
  quizzes: Quizzes;
}> = async () => {
  const quizzes = await getQuizzes();
  return { props: { quizzes } };
};

const Home: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ quizzes }) => {
  const gameStatus = useQuizStore(state => state.getGameStatus());

  switch (gameStatus) {
    case "notStarted":
      return <Main />;
    case "playing":
      return <Quiz initialData={quizzes} />;
    case "ended":
      return <Result />;
    default:
      throw Error("something went wrong");
  }
};

export default Home;
