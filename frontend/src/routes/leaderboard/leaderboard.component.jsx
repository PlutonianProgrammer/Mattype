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

  const { user, helperFetch } = useContext(AuthContext);

  useEffect(() => {
    async function fetchData() {
      // const newToken = refreshAccessToken();
      // let response = await fetch(
      //   "http://localhost:8000/userauth/get-leaderboard-placement-best/",
      //   {
      //     headers: { Authorization: `Bearer ${newToken}` },
      //   }
      // );
      // if (!response.ok) {
      //   const newToken = await refreshAccessToken();
      //   response = await fetch(
      //     "http://localhost:8000/userauth/get-leaderboard-placement-best/",
      //     {
      //       headers: { Authorization: `Bearer ${newToken}` },
      //     }
      //   );
      //   if (!response.ok) {
      //     console.log("FETCHING LEADERBOARD FAILED");
      //     return;
      //   }
      // }

      const response = helperFetch(
        "http://localhost:8000/userauth/get-leaderboard-placement-best/",
        "GET",
        null
      );
      try {
        console.log("LOGGING:", response);
        const data = await response.json();
        console.log("DATA:", data);
        setFirstPlace(data.first);
        setSecondPlace(data.second);
        setThirdPlace(data.third);
        setPlacement(data.placement);
        setParticipants(data.participants);
      } catch (e) {
        console.log(e);
      }
    }

    fetchData();
  }, []);

  return (
    <div className='leaderboard-container'>
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
