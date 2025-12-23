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
        <Link id='logo' to='/'>
          MT
        </Link>
        <Link to='/play'>Play</Link>
        {user && (
          <>
            <Link to='/stats'>Stats</Link>
            <Link to='/heatmap'>Heatmap</Link>
          </>
        )}
        <Link to='/leaderboard'>Leaderboard</Link>
        <Link to='/about'>About</Link>
        {!user ? (
          <Link to='/auth'>Sign-In</Link>
        ) : (
          <BubbleDiv onClick={logout}>Logout - {user.username}</BubbleDiv>
        )}
      </div>
      <Outlet />
    </>
  );
};

export default Navigation;
