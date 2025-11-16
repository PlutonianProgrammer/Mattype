import { Outlet, Link } from "react-router-dom";
import { useContext } from "react";

import BubbleDiv from "../../components/bubble-div/bubble-div.component";

import { AuthContext } from "../../contexts/AuthContext";

import "./navigation.styles.scss";

const Navigation = () => {
  const { user, logout } = useContext(AuthContext);
  return (
    <>
      <div className='nav-bar'>
        <BubbleDiv>
          <Link to='/'>HOME</Link>
        </BubbleDiv>
        <BubbleDiv>
          <Link to='/play'>Play</Link>
        </BubbleDiv>
        <BubbleDiv>
          <Link to='/stats'>Stats</Link>
        </BubbleDiv>
        <BubbleDiv>
          <Link to='/leaderboard'>Leaderboard</Link>
        </BubbleDiv>
        <BubbleDiv>
          <Link to='/about'>About</Link>
        </BubbleDiv>
        {!user ? (
          <BubbleDiv>
            <Link to='/auth'>Sign-In</Link>
          </BubbleDiv>
        ) : (
          <BubbleDiv>
            <button onClick={logout}>Logout</button>
          </BubbleDiv>
        )}
      </div>
      <Outlet />
    </>
  );
};

export default Navigation;
