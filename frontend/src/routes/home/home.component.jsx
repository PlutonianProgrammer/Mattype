import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../../contexts/AuthContext";

import BubbleDiv from "../../components/bubble-div/bubble-div.component";

import "./home.styles.scss";
const Home = () => {
  const { guestLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
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
  );
};

export default Home;
