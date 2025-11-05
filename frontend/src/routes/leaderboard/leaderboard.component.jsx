import { useEffect } from "react";
import { useState } from "react";

import BubbleDiv from "../../components/bubble-div/bubble-div.component";
import Podium from "../../components/podium/podium.component";

import "./leaderboard.styles.scss";

const Leaderboard = () => {
  const [firstPlace, setFirstPlace] = useState(null);
  const [secondPlace, setSecondPlace] = useState(null);
  const [thirdPlace, setThirdPlace] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://localhost:8000/api/users/");
      if (response.ok) {
        try {
          const data = await response.json();
          setFirstPlace(data[0]);
          setSecondPlace(data[1]);
          setThirdPlace(data[2]);
        } catch (e) {
          console.log(e);
        }
      } else {
        //TODO: HANDLE ERRORS
      }
    }

    fetchData();
  }, []);

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
