import { Outlet, Link } from "react-router-dom";
import "../navigation/navigation.styles.scss";
const Navigation = () => {
  return (
    <>
      <div className='nav-bar'>
        <Link to='/'>HOME</Link>
        <Link to='/play'>Play</Link>
        <Link to='/stats'>Stats</Link>
        <Link to='/leaderboard'>Leaderboard</Link>
        <Link to='/about'>About</Link>
        <Link to='/sign-in'>Sign-In</Link>
      </div>
      <Outlet />
    </>
  );
};

export default Navigation;
