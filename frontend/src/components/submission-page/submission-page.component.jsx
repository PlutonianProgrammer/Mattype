import { useState, useContext } from "react";

import { PlayContext } from "../../contexts/PlayContext";

import BubbleDiv from "../bubble-div/bubble-div.component";

import "./submission-page.styles.scss";
const SubmissionPage = () => {
  const { wordsTyped, mistakesCount, timeElapsed } = useContext(PlayContext);
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
      </BubbleDiv>
    </div>
  );
};

export default SubmissionPage;
