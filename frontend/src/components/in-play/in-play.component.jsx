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
    parToLines,
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
    "Superman is a superhero created by writer Jerry Siegel and artist Joe Shuster, first appearing in issue #1 of Action Comics, published in the United States on April 18, 1938.[1] Superman has been regularly published in American comic books since then, and has been adapted to other media including radio serials, novels, films, television shows, theater, and video games. Superman is the archetypal superhero: he wears an outlandish costume, uses a codename, and fights evil and averts disasters with the aid of extraordinary abilities. Although there are earlier characters who arguably fit this definition, it was Superman who popularized the superhero genre and established its conventions. He was the best-selling superhero in American comic books up until the 1980s;[2] it is also the best-selling comic book series in the world with 600 million copies sold.[3]";

  const paragraphInLines = parToLines(
    "Superman is a superhero created by writer Jerry Siegel and artist Joe Shuster, first appearing in issue #1 of Action Comics, published in the United States on April 18, 1938.[1] Superman has been regularly published in American comic books since then, and has been adapted to other media including radio serials, novels, films, television shows, theater, and video games. Superman is the archetypal superhero: he wears an outlandish costume, uses a codename, and fights evil and averts disasters with the aid of extraordinary abilities. Although there are earlier characters who arguably fit this definition, it was Superman who popularized the superhero genre and established its conventions. He was the best-selling superhero in American comic books up until the 1980s;[2] it is also the best-selling comic book series in the world with 600 million copies sold.[3]"
  );

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

  const indexRef = useRef(-1);

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
        {/* {paragraph.split("").map((char, idx) => (
          <div className='untyped' id={`LETTER-${idx}`} key={idx}>
            {char}
          </div>
        ))} */}

        {paragraphInLines.map((line, i) => (
          <div className='line' key={i}>
            {line.split("").map((char, idx) => {
              console.log("CHAR:", char);
              indexRef.current++;
              return (
                <div
                  className='untyped'
                  id={`LETTER-${indexRef.current}`}
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
        <button onClick={() => navigate("/")}>QUIT</button>
      </div>
    </div>
  );
};

export default InPlay;
