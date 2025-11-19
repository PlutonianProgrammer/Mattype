import InPlay from "../../components/in-play/in-play.component";
import BubbleDiv from "../../components/bubble-div/bubble-div.component";
import "./play.styles.scss";
import { useEffect, useState } from "react";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const Play = () => {
  const [phase, setPhase] = useState(1);

  const [timeUntilStart, setTimeUntilStart] = useState(3);
  const countDown = async () => {
    await delay(1000);

    setTimeUntilStart(2);
    await delay(1000);

    setTimeUntilStart(1);
    await delay(1000);

    setPhase(3);
  };
  useEffect(() => {
    if (phase == 2) countDown();
  }, [phase]);

  if (phase == 1) {
    return (
      <div className='play-page'>
        <BubbleDiv>
          <button
            onClick={() => {
              setPhase(2);
            }}
          >
            START
          </button>
        </BubbleDiv>
      </div>
    );
  } else if (phase == 2) {
    return (
      <div className='play-page'>
        <h1>{timeUntilStart}</h1>
      </div>
    );
  } else if (phase == 3) {
    return <InPlay />;
  }
};

export default Play;
