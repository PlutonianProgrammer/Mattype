import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../../contexts/AuthContext";

import BubbleDiv from "../../components/bubble-div/bubble-div.component";

import "./home.styles.scss";
const Home = () => {
  const { guestLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div className='full-container'>
      <div className='description'>
        <h1>Project Description</h1>
        <ul>
          <li>React Frontend (Hosted on Vercel)</li>
          <li>Django Backend (Hosted on Railway)</li>
          <li>MatPlotLib-Powered Graph of User's Scores over Time</li>
          <li>HeatMap Showing User's Accuracy of Specific Keys</li>
          <li>Fetches Typing Paragraphs from Wikipedia API</li>
        </ul>
      </div>
      <div className='home-container'>
        <h1>MatType</h1>
        <p>
          Typing Practice Application with Leaderboard and Graph Functionality
        </p>

        <BubbleDiv
          onClick={() => {
            guestLogin();
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
