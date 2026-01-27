import { useContext, useEffect, useRef, useState } from "react";

import { AuthContext } from "../../contexts/AuthContext";

import BubbleDiv from "../../components/bubble-div/bubble-div.component";
import Podium from "../../components/podium/podium.component";

import "./leaderboard.styles.scss";

const Leaderboard = () => {
  const [bestDisplay, setBestDisply] = useState(null);
  const [avgDisplay, setAvgDisplay] = useState(null);

  const [scoreToFetch, setScoreToFetch] = useState("avg");

  const { user, helperFetch } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      const response = await helperFetch(
        "http://localhost:8000/userauth/get-leaderboard/",
        "GET",
        null,
      );

      const data = await response.json();
      console.log(data);
      setBestDisply(data.best_data);
      setAvgDisplay(data.avg_data);
    };
    fetchData();
  }, [helperFetch]);

  const switchScoreToFetch = () => {
    if (scoreToFetch == "best") setScoreToFetch("avg");
    else setScoreToFetch("best");
  };

  const placementToSuffix = (placement) => {
    const last_digit = placement % 10;
    if (last_digit == 1) return "st";
    else if (last_digit == 2) return "nd";
    else if (last_digit == 3) return "rd";
    else return "th";
  };

  return (
    bestDisplay && (
      <div className='leaderboard-container'>
        <div className='leaderboard-left-side'>
          <h1>Leaderboard</h1>

          {!user && <h2>Login to See Placement</h2>}

          {user && (
            <BubbleDiv className='leaderboard-user-stats'>
              <h2>My Stats:</h2>
              <h4>
                My Best WPM--
                {user.best_wpm && user.best_wpm.toFixed(2)}wpm
              </h4>
              <h4>
                My Average WPM-- {user.avg_wpm && user.avg_wpm.toFixed(2)}wpm
              </h4>
              <h4>
                My Placement--{" "}
                {scoreToFetch == "best"
                  ? bestDisplay.placement
                  : avgDisplay.placement}
                {placementToSuffix(
                  scoreToFetch == "best"
                    ? bestDisplay.placement
                    : avgDisplay.placement,
                )}{" "}
                of {bestDisplay.participants} Participants
              </h4>
            </BubbleDiv>
          )}
        </div>
        <div className='leaderboard-right-side'>
          <div id='above-podium'>
            <BubbleDiv onClick={switchScoreToFetch}>
              Displaying{" "}
              {scoreToFetch.charAt(0).toUpperCase() + scoreToFetch.slice(1)} WPM
            </BubbleDiv>
          </div>
          <Podium
            firstPlace={
              scoreToFetch == "best" ? bestDisplay.first : avgDisplay.first
            }
            secondPlace={
              scoreToFetch == "best" ? bestDisplay.second : avgDisplay.second
            }
            thirdPlace={
              scoreToFetch == "best" ? bestDisplay.third : avgDisplay.third
            }
          />
        </div>
      </div>
    )
  );
};

export default Leaderboard;
