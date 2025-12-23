import { createContext, useEffect, useRef, useState } from "react";

export const PlayContext = createContext();

export const PlayProvider = ({ children }) => {
  // PHASE:
  const [phase, setPhase] = useState(1);
  const MISTAKES_DEFAULT = {
    "~": 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
    0: 0,
    "-": 0,
    "=": 0,
    q: 0,
    w: 0,
    e: 0,
    r: 0,
    t: 0,
    y: 0,
    u: 0,
    i: 0,
    o: 0,
    p: 0,
    "[": 0,
    "]": 0,
    "|": 0,
    a: 0,
    s: 0,
    d: 0,
    f: 0,
    g: 0,
    h: 0,
    j: 0,
    k: 0,
    l: 0,
    ";": 0,
    '"': 0,
    z: 0,
    x: 0,
    c: 0,
    v: 0,
    b: 0,
    n: 0,
    m: 0,
    ",": 0,
    ".": 0,
    "/": 0,
    space: 0,
  };
  const mistakes = useRef(MISTAKES_DEFAULT);
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

  // PROCESS PARAGRAPH INTO LINES AND WORDS
  const CHARS_PER_LINE = 75;
  const parToLines = (paragraph) => {
    const words = paragraph.split(" ");
    const result = [];
    let curLine = [];
    let charsInCurLine = 0;

    // get rows of words as lines
    for (const word of words) {
      if (charsInCurLine + word.length <= CHARS_PER_LINE) {
        curLine.push(word);
        charsInCurLine += word.length;
      } else {
        result.push(curLine);
        curLine = [word];
        charsInCurLine = word.length;
      }
    }
    if (charsInCurLine != 0) {
      result.push(curLine);
    }

    // convert into array of strings
    for (let i = 0; i < result.length; i++) {
      result[i] = result[i].join(" ");
      if (i != result.length - 1) {
        result[i] += " ";
      }
    }

    return result;
  };

  useEffect(() => {
    console.log("PHASE:", phase);
  }, [phase]);

  const [wordsTyped, setWordsTyped] = useState(0);
  const [mistakesCount, setMistakesCount] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);

  const [paragraph, setParagraph] = useState("");

  useEffect(() => {
    if (phase == 1) setParagraph("");
  }, [phase]);

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

        parToLines,
        paragraph,
        setParagraph,

        mistakes,
      }}
    >
      {children}
    </PlayContext.Provider>
  );
};
