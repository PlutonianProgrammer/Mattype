import { useContext, useEffect } from "react";
import { useState } from "react";

import { AuthContext } from "../../contexts/AuthContext";

import BubbleDiv from "../../components/bubble-div/bubble-div.component";
import Podium from "../../components/podium/podium.component";

import "./leaderboard.styles.scss";

const Leaderboard = () => {
  const [firstPlace, setFirstPlace] = useState({
    username: "harold",
  });
  const [secondPlace, setSecondPlace] = useState({
    username: "jim",
  });
  const [thirdPlace, setThirdPlace] = useState({
    username: "bert",
  });
  const [placement, setPlacement] = useState(0);
  const [participants, setParticipants] = useState(0);

  const { user, accessToken, refreshAccessToken } = useContext(AuthContext);

  useEffect(() => {
    async function fetchData() {
      let response = await fetch(
        "http://localhost:8000/userauth/get-leaderboard-placement-best/",
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      if (!response.ok) {
        const newToken = refreshAccessToken();
        response = await fetch(
          "http://localhost:8000/userauth/get-leaderboard-placement-best/",
          {
            headers: { Authorization: `Bearer ${newToken}` },
          }
        );
        if (!response.ok) {
          console.log("FETCHING LEADERBOARD FAILED");
          return;
        }
      }
      try {
        console.log("LOGGING:");
        console.log(response);
        const data = await response.json();
        console.log(data);
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
