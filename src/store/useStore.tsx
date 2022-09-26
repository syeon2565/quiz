import create from "zustand";

type QuizState = {
  startTime: null | Date;
  endTime: null | Date;
  isPlaying: boolean;
  currentQuizNum: number;
  startQuiz: () => void;
  onNextQuiz: () => void;
};

const useQuizStore = create<QuizState>((set, get) => ({
  startTime: null,
  endTime: null,
  isPlaying: get().startTime !== get().endTime,
  currentQuizNum: 0,
  startQuiz: () =>
    set(() => ({
      startTime: new Date(),
    })),
  onNextQuiz: () =>
    set(state => {
      if (!state.isPlaying) {
        return {};
      }
      return {
        currentQuizNum: state.currentQuizNum + 1,
      };
    }),
}));

export default useQuizStore;
