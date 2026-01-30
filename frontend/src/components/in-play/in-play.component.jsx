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
    parCharCount,
    link,
    getKey,
  } = useContext(PlayContext);
  const navigate = useNavigate();

  // HANDLE STOPWATCH
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

  const paragraphInLines = parToLines(paragraph);

  const charIndexRef = useRef(0);
  const madeMistakeInCurrentWord = useRef(false);
  const prevKeystrokeWasMistake = useRef(false);

  const handleKeyPress = (event) => {
    if (event.key != "Shift") {
      // Logging keycount:
      const properKey = getKey(paragraph.charAt(charIndexRef.current));
      parCharCount.current[properKey] += 1;

      const letterDiv = document.getElementById(
        `LETTER-${charIndexRef.current}`,
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
        <BubbleDiv
          onClick={() => {
            navigate("/");
          }}
        >
          QUIT
        </BubbleDiv>
      </div>
      <div className='credit-container'>
        <a href={"https://creativecommons.org/licenses/by-sa/4.0/deed.en"}>
          Source: Wikipedia, CC BY-SA 4.0
        </a>
        <a href={link}>{link}</a>
      </div>
    </div>
  );
};

export default InPlay;
