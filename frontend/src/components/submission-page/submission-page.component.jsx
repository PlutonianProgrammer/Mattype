import { useState, useContext, useRef } from "react";

import { PlayContext } from "../../contexts/PlayContext";

import { AuthContext } from "../../contexts/AuthContext";

import BubbleDiv from "../bubble-div/bubble-div.component";

import "./submission-page.styles.scss";

const submitScore = async (token, wpm) => {
  const response = await fetch("http://localhost:8000/userauth/submit-score/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ wpm }),
  });
  return response;
};

const handleSubmit = async () => {
  let response = await submitScore(
    accessToken,
    wordsTyped / (timeElapsed / 1000 / 60)
  );
  if (!response.ok) {
    console.log("ISSUE OCCURRED IN SUBMITTING SCORE");
    token = refreshAccessToken();
    console.log("TRYING AGAIN");
    response = await submitScore(
      accessToken,
      wordsTyped / (timeElapsed / 1000 / 60)
    );
    if (!response.ok) {
      console.log("FAILED");
      console.log(response);
    } else {
      console.log("SECOND TRY WORKED");
    }
  } else {
    console.log("SUCCESS WITH SUBMITSCORE");
  }
};

const { wordsTyped, mistakesCount, timeElapsed } = useContext(PlayContext);
const { accessToken, refreshAccessToken } = useContext(AuthContext);
const SubmissionPage = () => {
  return (
    <div className='submission-page-container'>
      <BubbleDiv>
        <h1>CONGRADULATIONS</h1>
        <ul>
          <li>Words Typed: {wordsTyped}</li>
          <li>Mistakes Made: {mistakesCount}</li>
          <li>Time Elapsed: {timeElapsed / 1000}s</li>
          <li>Words Per Minute: {wordsTyped / (timeElapsed / 1000 / 60)}</li>
        </ul>
        <button onClick={handleSubmit}>SUBMIT</button>
      </BubbleDiv>
    </div>
  );
};

export default SubmissionPage;
