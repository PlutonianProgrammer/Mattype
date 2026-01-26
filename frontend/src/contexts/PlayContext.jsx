import { createContext, useEffect, useRef, useState } from "react";

export const getZeroKeysDict = () => {
  return {
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
};

export const PlayContext = createContext();

export const PlayProvider = ({ children }) => {
  // PHASE:
  const [phase, setPhase] = useState(1);

  const mistakes = useRef(getZeroKeysDict());
  const parCharCount = useRef(getZeroKeysDict());

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

  const [wordsTyped, setWordsTyped] = useState(0);
  const [mistakesCount, setMistakesCount] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);

  const [paragraph, setParagraph] = useState("");

  useEffect(() => {
    if (phase == 1) {
      setParagraph("");
      mistakes.current = getZeroKeysDict();
      parCharCount.current = getZeroKeysDict();
    }
  }, [phase]);

  const [link, setLink] = useState(null);

  const resetState = () => {
    setPhase(1);
    setWordsTyped(0);
    setMistakesCount(0);
    setTimeElapsed(0);
    mistakes.current = getZeroKeysDict();
    parCharCount.current = getZeroKeysDict();
    setLink(null);
  };
  const getKey = (c) => {
    const charCode = c.charCodeAt(0);
    if (97 <= charCode && charCode <= 122) {
    } else if (65 <= charCode && charCode <= 90) {
      c = c.toLowerCase();
    } else {
      switch (c) {
        case "`":
          c = "~";
        case "!":
          c = "1";
        case "@":
          c = "2";
        case "#":
          c = "3";
        case "$":
          c = "4";
        case "%":
          c = "5";
        case "^":
          c = "6";
        case "&":
          c = "7";
        case "*":
          c = "8";
        case "(":
          c = "9";
        case ")":
          c = "0";
        case "_":
          c = "-";
        case "+":
          c = "=";
        case "{":
          c = "[";
        case "}":
          c = "]";
        case "\\":
          c = "|";
        case ":":
          c = ";";
        case "'":
          c = '"';
        case "<":
          c = ",";
        case ">":
          c = ".";
        case "/":
          c = "?";
        case " ":
          c = "space";
      }
    }

    return c;
  };

  return (
    <PlayContext.Provider
      value={{
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
        parCharCount,

        link,
        setLink,
        resetState,
        getKey,
      }}
    >
      {children}
    </PlayContext.Provider>
  );
};
