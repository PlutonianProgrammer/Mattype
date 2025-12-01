import { useContext, useEffect, useState } from "react";

import { AuthContext } from "../../contexts/AuthContext";

import BubbleDiv from "../../components/bubble-div/bubble-div.component";

import "./stats.styles.scss";

const Stats = () => {
  const { user } = useContext(AuthContext);
  if (user) {
    return (
      <div className='stats-page-container'>
        <div className='my-stats-container'>
          {user && (
            <BubbleDiv>
              <h1>My Stats</h1>
              <h3>Best WPM: {user.best_wpm.toFixed(2)} wpm</h3>
              <h3>Avg WPM: {user.avg_wpm.toFixed(2)} wpm</h3>
            </BubbleDiv>
          )}
        </div>
        <div className='graph-container'>
          <div className='graph-placeholder' />
        </div>
      </div>
    );
  } else {
    return <h1>You Must Be Signed In To Use This Page</h1>;
  }
};

export default Stats;
