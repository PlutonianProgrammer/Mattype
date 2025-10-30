import { Outlet, Link } from "react-router-dom";
import "./navigation.styles.scss";
import BubbleDiv from "../../components/bubble-div/bubble-div.component";
const Navigation = () => {
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
        <BubbleDiv>
          <Link to='/sign-in'>Sign-In</Link>
        </BubbleDiv>
      </div>
      <Outlet />
    </>
  );
};

export default Navigation;
