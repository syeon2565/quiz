import { toast } from "react-toastify";
import create from "zustand";

type QuizState = {
  startTime: null | Date;
  endTime: null | Date;
  getGameStatus: () => "notStarted" | "playing" | "ended";
  currentQuizNum: number;
  clicked: boolean;
  score: number;
  startQuiz: () => void;
  onSubmit: () => void;
  onNextQuiz: () => void;
  checkedAnswer: (i: number, answerIndex: number) => void;
  ReStartQuiz: () => void;
};

const useQuizStore = create<QuizState>((set, get) => ({
  startTime: null,
  endTime: null,
  getGameStatus: () => {
    if (!get().startTime) {
      return "notStarted";
    }
    if (!get().endTime) {
      return "playing";
    }
    return "ended";
  },
  currentQuizNum: 0,
  clicked: false,
  score: 0,
  startQuiz: () =>
    set(() => {
      return {
        startTime: new Date(),
      };
    }),
  onNextQuiz: () =>
    set(state => {
      toast.dismiss();
      return {
        currentQuizNum: state.currentQuizNum + 1,
        clicked: false,
      };
    }),
  onSubmit: () =>
    set(state => {
      toast.dismiss();
      return {
        endTime: new Date(),
        currentQuizNum: state.currentQuizNum + 1,
      };
    }),
  checkedAnswer: (index: number, answerIndex: number) =>
    set(state => {
      if (index === answerIndex) {
        state.score += 1;
        toast.success("축하드려요! 정답입니다.");
        return { score: state.score, clicked: true };
      }
      toast.error("아쉽지만, 오답입니다!");
      return { clicked: true };
    }),
  ReStartQuiz: () =>
    set(() => {
      return {
        startTime: new Date(),
        endTime: null,
        currentQuizNum: 0,
        clicked: false,
        score: 0,
      };
    }),
}));

export default useQuizStore;
