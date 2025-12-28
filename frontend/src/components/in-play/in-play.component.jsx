import { useState, useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";

import BubbleDiv from "../bubble-div/bubble-div.component";

import { PlayContext } from "../../contexts/PlayContext";

import "./in-play.styles.scss";
const InPlay = () => {
  const {
    wordsTyped,
    setWordsTyped,
    mistakesCount,
    setMistakesCount,
    timeElapsed,
    setTimeElapsed,
    setPhase,

    parToLines,
    paragraph,
    mistakes,
    parWordCount,
  } = useContext(PlayContext);
  const navigate = useNavigate();

  // HANDLE TIMER
  useEffect(() => {
    const startTime = new Date();
    const intervalID = setInterval(() => {
      setTimeElapsed(new Date() - startTime);
    });
    return () => clearInterval(intervalID);
  }, []);

  // Make the player 'focus' in order to accept input
  const makePlayerFocus = useRef(null);
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code == "Space") {
        e.preventDefault();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    makePlayerFocus.current.focus();

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Reset game when user backs out of this page
  useEffect(() => {
    return () => {
      if (charIndexRef.current < paragraph.length) {
        setPhase(1);
      }
    };
  }, []);

  const paragraphInLines = parToLines(paragraph);

  const charIndexRef = useRef(0);
  const madeMistakeInCurrentWord = useRef(false);
  const prevKeystrokeWasMistake = useRef(false);

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

  const handleKeyPress = (event) => {
    if (event.key != "Shift") {
      // Logging keycount:
      const properKey = getKey(paragraph.charAt(charIndexRef.current));
      parWordCount.current[properKey] += 1;

      const letterDiv = document.getElementById(
        `LETTER-${charIndexRef.current}`
      );
      if (event.key == paragraph.charAt(charIndexRef.current)) {
        letterDiv.className = "correct";
        prevKeystrokeWasMistake.current = false;
        if (event.key == " ") {
          if (!madeMistakeInCurrentWord.current) setWordsTyped(wordsTyped + 1);
          madeMistakeInCurrentWord.current = false;
        }
      } else {
        letterDiv.className = "wrong";
        if (!madeMistakeInCurrentWord.current) {
          madeMistakeInCurrentWord.current = true;
        }
        if (!prevKeystrokeWasMistake.current) {
          console.log("Mistake:", paragraph.charAt(charIndexRef.current));
          setMistakesCount(mistakesCount + 1);
          mistakes.current[getKey(paragraph.charAt(charIndexRef.current))] += 1;
        }
        prevKeystrokeWasMistake.current = true;
      }
      charIndexRef.current++;
    }
    if (charIndexRef.current == paragraph.length) setPhase(4);
  };

  const getTotalCharAmountFromPreviousLines = (lines, index) => {
    let totalChars = 0;
    for (let i = 0; i < index; i++) {
      totalChars += lines[i].length;
    }
    return totalChars;
  };

  return (
    <div className='in-play-page'>
      <div className='heads-up-display'>
        <div className='words-typed-container of-heads-up'>
          <span>Words Typed: {wordsTyped}</span>
        </div>
        <div className='mistakes-container of-heads-up'>
          <span>Mistakes Made: {mistakesCount}</span>
        </div>
        <div className='time-container of-heads-up'>
          <span>Time Elapsed: {(timeElapsed / 1000).toFixed(3)}s</span>
        </div>
      </div>
      <div
        className='paragraph-holder'
        ref={makePlayerFocus}
        onKeyDown={handleKeyPress}
        tabIndex={0}
      >
        {/* {paragraph.split("").map((char, idx) => (
          <div className='untyped' id={`LETTER-${idx}`} key={idx}>
            {char}
          </div>
        ))} */}

        {paragraphInLines.map((line, i) => (
          <div className='line' key={i}>
            {line.split("").map((char, idx) => {
              return (
                <div
                  className='untyped'
                  id={`LETTER-${
                    getTotalCharAmountFromPreviousLines(paragraphInLines, i) +
                    idx
                  }`}
                  key={idx}
                >
                  {char}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <div className='quit-container'>
        <BubbleDiv onClick={() => navigate("/")}>QUIT</BubbleDiv>
      </div>
    </div>
  );
};

export default InPlay;
