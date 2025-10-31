import BubbleDiv from "../../components/bubble-div/bubble-div.component";
import Podium from "../../components/podium/podium.component";

import "./leaderboard.styles.scss";

const Leaderboard = () => {
  const firstPlace = { name: "Alex", placement: 1 };
  const secondPlace = { name: "Bert", placement: 2 };
  const thirdPlace = { name: "Carl", placement: 3 };
  return (
    <div className='leaderboard-container'>
      <BubbleDiv className='personal-placement-container'>
        <h1>Your Placement:</h1>
        <p>1st</p>
        <h2>Out Of</h2>
        <p>300 Participants</p>
      </BubbleDiv>

      <div className='podium-container'>
        <Podium
          firstPlace={firstPlace}
          secondPlace={secondPlace}
          thirdPlace={thirdPlace}
        />
      </div>
    </div>
  );
};

export default Leaderboard;
