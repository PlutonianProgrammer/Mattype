import BubbleDiv from "../../components/bubble-div/bubble-div.component";

import "./stats.styles.scss";

const Stats = () => {
  return (
    <div className='stats-page-container'>
      <div className='left-side'>
        <h1>My Stats</h1>
        <BubbleDiv>
          <h3>Best WPM: |FILLER|</h3>
          <h3>Avg WPM: |FILLER|</h3>
          <h3>My Placement: |FILLER|</h3>
        </BubbleDiv>
      </div>

      <div className='graph-container'></div>

      <div className='right-side'></div>
    </div>
  );
};

export default Stats;
