import { useEffect, useState } from "react";
import BubbleDiv from "../../components/bubble-div/bubble-div.component";

import "./stats.styles.scss";

const Stats = () => {
  const [bestWPM, setBestWPM] = useState(-1);
  const [avgWPM, setAvgWPM] = useState(-1);
  const [placement, setPlacement] = useState(-1);

  // useEffect(async () => {
  //   // get information from user
  //   const response = await fetch("http://localhost:8000/api/users/");
  //   // set information from user
  //   if (!response.ok) {
  //     throw new Error(`Issue getting data ${response.status}`);
  //   }

  //   try {
  //     const { bestWPM, avgWPM, placement } = await response.json();

  //     setBestWPM(bestWPM);
  //     setAvgWPM(avgWPM);
  //     setPlacement(placement);
  //   } catch (error) {
  //     console.log("Error extracting from response:", error);
  //   }
  // }, []);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://localhost:8000/api/users/");
      if (response.ok) {
        try {
          const data = await response.json();
          console.log(data);
        } catch (e) {
          console.log(e);
        }
      }
    }

    fetchData();
  }, []);

  return (
    <div className='stats-page-container'>
      <div className='left-side'>
        <h1>My Stats</h1>
        <BubbleDiv>
          <h3>Best WPM: {bestWPM}</h3>
          <h3>Avg WPM: {avgWPM}</h3>
          <h3>My Placement: {placement}</h3>
        </BubbleDiv>
      </div>

      <div className='graph-container'></div>

      <div className='right-side'></div>
    </div>
  );
};

export default Stats;
