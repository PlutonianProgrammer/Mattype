import { useState, useContext, useRef, useEffect } from "react";

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
    resetState,
    mistakes,
    parCharCount,
  } = useContext(PlayContext);
  const { helperFetch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    console.log("MIST:", mistakes.current);
    console.log("WC:", parCharCount.current);
    const response = await helperFetch(
      process.env.REACT_APP_BACKEND_URL + "/userauth/submit-score/",
      "POST",
      {
        wpm: wordsTyped / (timeElapsed / 1000 / 60),
        mistakes: mistakes.current,
        charCount: parCharCount.current,
      },
    );
    resetState();
    navigate("/");
  };

  useEffect(() => resetState, []);

  return (
    <div className='submission-page-container'>
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
