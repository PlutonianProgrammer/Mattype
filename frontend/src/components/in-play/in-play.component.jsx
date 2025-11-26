import { useState, useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";

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

  const paragraph =
    "The Hulk is a superhero appearing in American comic books published by Marvel Comics. Created by writer Stan Lee";

  const charIndexRef = useRef(0);
  const madeMistakeInCurrentWord = useRef(false);

  const handleKeyPress = (event) => {
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
    if (charIndexRef.current == paragraph.length) setPhase(4);
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
        <button onClick={() => navigate("/")}>QUIT</button>
      </div>
    </div>
  );
};

export default InPlay;
