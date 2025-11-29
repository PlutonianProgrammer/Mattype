import { useContext, useEffect } from "react";
import { useState } from "react";

import { AuthContext } from "../../contexts/AuthContext";

import BubbleDiv from "../../components/bubble-div/bubble-div.component";
import Podium from "../../components/podium/podium.component";

import "./leaderboard.styles.scss";

const Leaderboard = () => {
  const [firstPlace, setFirstPlace] = useState(null);
  const [secondPlace, setSecondPlace] = useState(null);
  const [thirdPlace, setThirdPlace] = useState(null);
  const [placement, setPlacement] = useState(0);
  const [participants, setParticipants] = useState(0);

  const [scoreToFetch, setScoreToFetch] = useState("avg");

  const { user, helperFetch } = useContext(AuthContext);

  // useEffect(() => {
  //   async function fetchData() {
  //     const response = await helperFetch(
  //       "http://localhost:8000/userauth/get-leaderboard-placement-best/",
  //       "GET",
  //       null
  //     );
  //     console.log("LOGGING:", response);
  //     const data = await response.json();
  //     console.log("DATA:", data);
  //     setFirstPlace(data.first);
  //     setSecondPlace(data.second);
  //     setThirdPlace(data.third);
  //     setPlacement(data.placement);
  //     setParticipants(data.participants);
  //   }

  //   fetchData();
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      console.log("FETCHING");
      const response = await helperFetch(
        `http://localhost:8000/userauth/get-leaderboard-placement-${scoreToFetch}/`,
        "GET",
        null
      );
      const data = await response.json();
      console.log(data);
      setFirstPlace(data.first);
      setSecondPlace(data.second);
      setThirdPlace(data.third);
      setPlacement(data.placement);
      setParticipants(data.participants);
    };
    fetchData();
  }, [scoreToFetch]);

  const switchScoreToFetch = () => {
    if (scoreToFetch == "best") setScoreToFetch("avg");
    else setScoreToFetch("best");
  };

  return (
    <div className='leaderboard-container'>
      <BubbleDiv>
        <button onClick={switchScoreToFetch}>
          Switch To {scoreToFetch == "best" ? "Average WPM" : "Best WPM"}
        </button>
      </BubbleDiv>
      <BubbleDiv className='leaderboard-my-stats'>
        <h1>Leaderboard</h1>
        {user && (
          <ul>
            <li>My Best WPM: {user.best_wpm}</li>
            <li>My Average WPM: {user.avg_wpm}</li>
            <li>Placement: {placement}</li>
            <li>Out of {participants} participants</li>
          </ul>
        )}
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
