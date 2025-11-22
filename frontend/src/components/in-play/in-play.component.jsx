import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import "./in-play.styles.scss";
const InPlay = () => {
  const navigate = useNavigate();
  // TIMER
  const [timeElapsed, setTimeElapsed] = useState(0);
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
        console.log("SPACE PRESSED");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    makePlayerFocus.current.focus();

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const paragraph =
    "Wolverine is a superhero who appears in American comic books published by Marvel Comics. The character first ";

  const charIndexRef = useRef(0);
  const [wordsTyped, setWordsTyped] = useState(0);
  const [mistakesCount, setMistakesCount] = useState(0);

  const madeMistakeInCurrentWord = useRef(false);
  const handleKeyPress = (event) => {
    console.log("PRESSED:", event.key);
    if (event.key != "Shift") {
      const letterDiv = document.getElementById(
        `LETTER-${charIndexRef.current}`
      );
      if (event.key == paragraph.charAt(charIndexRef.current)) {
        letterDiv.className = "correct";
        if (event.key == " ") {
          if (!madeMistakeInCurrentWord.current) setWordsTyped(wordsTyped + 1);
          madeMistakeInCurrentWord.current = false;
        }
      } else {
        letterDiv.className = "wrong";
        if (!madeMistakeInCurrentWord.current) {
          madeMistakeInCurrentWord.current = true;
          setMistakesCount(mistakesCount + 1);
        }
      }
      charIndexRef.current++;
    }
    if (charIndexRef.current == paragraph.length) quit();
  };

  const [quitted, setQuitted] = useState(false);

  const quit = () => {
    // Account for edge case
    if (!madeMistakeInCurrentWord) setMistakesCount(mistakesCount + 1);
    setQuitted(true);
  };

  if (!quitted) {
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
            <span>Time Elapsed: {timeElapsed / 1000}s</span>
          </div>
        </div>
        <div
          className='paragraph-holder'
          ref={makePlayerFocus}
          onKeyDown={handleKeyPress}
          tabIndex={0}
        >
          {paragraph.split("").map((char, idx) => (
            <div className='untyped' id={`LETTER-${idx}`} key={idx}>
              {char}
            </div>
          ))}
        </div>
        <div className='quit-container'>
          <button onClick={quit}>QUIT</button>
        </div>
      </div>
    );
  } else {
    if (charIndexRef.current == paragraph.length) {
      return (
        <div>
          <h1>{wordsTyped}</h1>
          <h1>{timeElapsed}</h1>
          <h1>{mistakesCount}</h1>
        </div>
      );
    } else {
      navigate("/");
    }
  }
};

export default InPlay;
