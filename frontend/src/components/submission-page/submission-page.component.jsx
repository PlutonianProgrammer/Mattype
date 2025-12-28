import { useState, useContext, useRef } from "react";

import { useNavigate } from "react-router-dom";

import { PlayContext } from "../../contexts/PlayContext";

import { AuthContext } from "../../contexts/AuthContext";

import BubbleDiv from "../bubble-div/bubble-div.component";

import "./submission-page.styles.scss";
const SubmissionPage = () => {
  const {
    wordsTyped,
    mistakesCount,
    timeElapsed,
    setPhase,
    setWordsTyped,
    setMistakesCount,
    setTimeElapsed,
    MISTAKES_DEFAULT,
    mistakes,
    parWordCount,
  } = useContext(PlayContext);
  const { helperFetch } = useContext(AuthContext);
  const navigate = useNavigate();

  // const submitScore = async (wpm) => {
  // const response = await fetch(
  //   "http://localhost:8000/userauth/submit-score/",
  //   {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${token}`,
  //     },
  //     body: JSON.stringify({ wpm }),
  //   }
  // );
  //   const response = await helperFetch(
  //     "http://localhost:8000/userauth/submit-score",
  //     wpm
  //   );
  //   return response;
  // };

  const handleSubmit = async () => {
    // console.log("OLD:", accessToken);
    // let response = await submitScore(
    //   accessToken,
    //   wordsTyped / (timeElapsed / 1000 / 60)
    // );
    // if (!response.ok) {
    //   console.log("ISSUE OCCURRED IN SUBMITTING SCORE");
    //   const newToken = refreshAccessToken();
    //   console.log("NEW:", newToken);
    //   console.log("TRYING AGAIN");
    //   response = await submitScore(
    //     newToken,
    //     wordsTyped / (timeElapsed / 1000 / 60)
    //   );
    //   if (!response.ok) {
    //     console.log("FAILED");
    //     console.log(response);
    //     return;
    //   }
    console.log(mistakes);
    const response = await helperFetch(
      "http://localhost:8000/userauth/submit-score/",
      "POST",
      {
        wpm: wordsTyped / (timeElapsed / 1000 / 60),
        mistakes: mistakes.current,
        wordCount: parWordCount.current,
      }
    );
    setPhase(1);
    setWordsTyped(0);
    setMistakesCount(0);
    setTimeElapsed(0);
    mistakes.current = MISTAKES_DEFAULT;
    mistakes.current = { ...MISTAKES_DEFAULT };
    navigate("/");
  };
  // };

  return (
    <div className='submission-page-container'>
      <h1>CONGRADULATIONS</h1>
      <div className='body-container'>
        <BubbleDiv className='stats-container'>
          <ul>
            <li>Words Typed: {wordsTyped}</li>
            <li>Mistakes Made: {mistakesCount}</li>
            <li>Time Elapsed: {timeElapsed / 1000}s</li>
            <li>Words Per Minute: {wordsTyped / (timeElapsed / 1000 / 60)}</li>
          </ul>
        </BubbleDiv>

        <div className='action-buttons'>
          <BubbleDiv className='discard' onClick={() => navigate("/")}>
            DISCARD
          </BubbleDiv>
          <BubbleDiv className='submit' onClick={handleSubmit}>
            SUBMIT
          </BubbleDiv>
        </div>
      </div>
    </div>
  );
};

export default SubmissionPage;
