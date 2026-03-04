import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../../contexts/AuthContext";

import BubbleDiv from "../../components/bubble-div/bubble-div.component";

import "./home.styles.scss";
const Home = () => {
  const navigate = useNavigate();
  return (
    <div className='full-container'>
      <div className='description'>
        <h1>Project Description</h1>
        <ul>
          <li>Frontend- React (Hosted on Vercel)</li>
          <li>Backend- Django (Hosted on Railway)</li>
          <li>
            Uses MatPlotLib (Common Stat/Machine Learning Package) to Display
            Tracked Scores Over Time
          </li>
          <li>Generates HeatMap Showing User's Accuracy of Specific Keys</li>
          <li>Typing Paragraphs Fetched From Wikipedia's API</li>
          <li>
            Leaderboard Function Displays Users' Scores Relative to One Another
          </li>
          <li>Supports Login With Google</li>
        </ul>
      </div>
      <div className='home-container'>
        <h1>MatType</h1>
        <p>
          Typing Practice Application with Leaderboard and Graph Functionality
        </p>

        <BubbleDiv
          onClick={() => {
            navigate("play");
          }}
        >
          Play Now
        </BubbleDiv>
      </div>
    </div>
  );
};

export default Home;
