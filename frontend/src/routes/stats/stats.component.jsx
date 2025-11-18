import { useContext, useEffect, useState } from "react";

import { AuthContext } from "../../contexts/AuthContext";

import BubbleDiv from "../../components/bubble-div/bubble-div.component";

import "./stats.styles.scss";

const Stats = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className='stats-page-container'>
      <div className='left-side'>
        <h1>My Stats</h1>
        <BubbleDiv>
          <h3>Best WPM: {}</h3>
          <h3>Avg WPM: {}</h3>
          <h3>My Placement: {}</h3>
        </BubbleDiv>
      </div>

      <div className='graph-container'></div>

      <div className='right-side'></div>
    </div>
  );
};

export default Stats;
