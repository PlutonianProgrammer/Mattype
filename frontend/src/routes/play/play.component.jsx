import { PlayContext } from "../../contexts/PlayContext";
import CountDown from "../../components/countdown/countdown.component";
import InPlay from "../../components/in-play/in-play.component";
import SubmissionPage from "../../components/submission-page/submission-page.component";
import BubbleDiv from "../../components/bubble-div/bubble-div.component";
import "./play.styles.scss";
import { useEffect, useState, useContext } from "react";

const Play = () => {
  const { phase, setPhase } = useContext(PlayContext);

  if (phase == 1) {
    return (
      <div className='play-page'>
        <BubbleDiv
          onClick={() => {
            setPhase(2);
          }}
        >
          Press Me To Start Typing Test
        </BubbleDiv>
      </div>
    );
  } else if (phase == 2) {
    return <CountDown />;
  } else if (phase == 3) {
    return <InPlay />;
  } else if (phase == 4) {
    return <SubmissionPage />;
  }
};

export default Play;
