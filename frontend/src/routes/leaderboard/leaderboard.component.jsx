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

  const placementToSuffix = () => {
    const last_digit = placement % 10;
    if (last_digit == 1) return "st";
    else if (last_digit == 2) return "nd";
    else if (last_digit == 3) return "rd";
    else return "th";
  };

  return (
    <div className='leaderboard-container'>
      <div className='leaderboard-left-side'>
        <h1>
          Leaderboard-{" "}
          {scoreToFetch.charAt(0).toUpperCase() + scoreToFetch.slice(1)} WPM
        </h1>

        {user && (
          <div className='leaderboard-user-stats'>
            <h3>My Best WPM: {user.best_wpm.toFixed(2)}</h3>
            <h3>My Average WPM: {user.avg_wpm.toFixed(2)}</h3>
            <h3>
              Placement: {placement}
              {placementToSuffix()}
            </h3>
          </div>
        )}
      </div>
      <div className='leaderboard-right-side'>
        <BubbleDiv
          className='switch-score-type-button'
          onClick={switchScoreToFetch}
        >
          Change to {scoreToFetch == "best" ? "Average WPM" : "Best WPM"}
        </BubbleDiv>
        <Podium
          firstPlace={firstPlace}
          secondPlace={secondPlace}
          thirdPlace={thirdPlace}
        />

        <p>Participants: {participants}</p>
      </div>
    </div>
  );
};

export default Leaderboard;
