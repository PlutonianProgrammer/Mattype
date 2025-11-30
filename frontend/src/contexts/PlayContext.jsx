import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

export const PlayContext = createContext();

export const PlayProvider = ({ children }) => {
  // PHASE:
  const [phase, setPhase] = useState(1);
  // COUNTDOWN:
  const [countDownVar, setCountDownVar] = useState(100);
  const countDown = async (startNum) => {
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    while (startNum > 0) {
      setCountDownVar(startNum);
      startNum -= 1;
      await delay(1000);
    }
    setCountDownVar(0);
    setPhase(3);
  };

  useEffect(() => {
    console.log("PHASE:", phase);
  }, [phase]);

  const [wordsTyped, setWordsTyped] = useState(0);
  const [mistakesCount, setMistakesCount] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);

  return (
    <PlayContext.Provider
      value={{
        countDown,
        countDownVar,

        phase,
        setPhase,

        wordsTyped,
        setWordsTyped,

        mistakesCount,
        setMistakesCount,

        timeElapsed,
        setTimeElapsed,
      }}
    >
      {children}
    </PlayContext.Provider>
  );
};
