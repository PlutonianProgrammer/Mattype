import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../contexts/AuthContext";

import BubbleDiv from "../../components/bubble-div/bubble-div.component";

import "./home.styles.scss";
const Home = () => {
  const { login, user } = useContext(AuthContext);
  return (
    <div className='home-container'>
      <h1>MatType</h1>
      <p>
        Typing Practice Application with Leaderboard and Graph Functionality
      </p>

      <BubbleDiv>
        <Link
          to='/play'
          onClick={() => !user && login("UniversalGuest", "GuestPassword123")}
        >
          Demo Now
        </Link>
      </BubbleDiv>
    </div>
  );
};

export default Home;
