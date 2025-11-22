import { useContext, useEffect } from "react";
import { PlayContext } from "../../contexts/PlayContext";
import BubbleDiv from "../bubble-div/bubble-div.component";
import "./countdown.styles.scss";
const CountDown = () => {
  const { countDown, countDownVar } = useContext(PlayContext);
  useEffect(() => {
    countDown(3);
  }, []);
  return (
    <div className='count-down-container'>
      <BubbleDiv>
        <h1>{countDownVar}</h1>
      </BubbleDiv>
    </div>
  );
};

export default CountDown;
