import { useContext, useEffect, useState } from "react";

import { AuthContext } from "../../contexts/AuthContext";

import BubbleDiv from "../../components/bubble-div/bubble-div.component";

import "./stats.styles.scss";

const Stats = () => {
  const { user, helperFetch } = useContext(AuthContext);
  const [imageUrl, setImageUrl] = useState(null);
  useEffect(() => {
    const getGraph = async () => {
      const response = await helperFetch(
        "http://localhost:8000/userauth/get-user-graph/",
        "GET",
        null
      );
      console.log("RESPONSE:", response);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setImageUrl(url);
    };
    getGraph();
  }, []);

  if (user) {
    return (
      <div className='stats-page-container'>
        <div className='my-stats-container'>
          {user && (
            <>
              <h1>My Stats</h1>
              <BubbleDiv>
                <h3>Best WPM: {user.best_wpm.toFixed(2)} wpm</h3>
                <h3>Avg WPM: {user.avg_wpm.toFixed(2)} wpm</h3>
              </BubbleDiv>
            </>
          )}
        </div>
        <div className='graph-container'>
          {imageUrl && <img id='graph' src={imageUrl} />}
        </div>
      </div>
    );
  } else return <h1>YOU MUST BE LOGGED IN TO USE THIS PAGE</h1>;
};

export default Stats;
