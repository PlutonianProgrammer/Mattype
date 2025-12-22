import { PlayContext } from "../../contexts/PlayContext";
import CountDown from "../../components/countdown/countdown.component";
import InPlay from "../../components/in-play/in-play.component";
import SubmissionPage from "../../components/submission-page/submission-page.component";
import BubbleDiv from "../../components/bubble-div/bubble-div.component";
import "./play.styles.scss";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

const Play = () => {
  const { phase, setPhase } = useContext(PlayContext);
  const { guestLogin, user } = useContext(AuthContext);
  const navigate = useNavigate();

  if (phase == 1) {
    return (
      <div className='play-page'>
        {user && (
          <BubbleDiv
            onClick={() => {
              setPhase(2);
            }}
          >
            Start
          </BubbleDiv>
        )}
        {!user && (
          <>
            <BubbleDiv
              className='google-button'
              onClick={() => alert("Signing in with Google...")}
            >
              Sign In With Google
            </BubbleDiv>
            <BubbleDiv className='to-auth' onClick={() => navigate("../auth")}>
              Sign In or Create Account
            </BubbleDiv>
            <BubbleDiv className='guest-button' onClick={guestLogin}>
              Play as Guest
            </BubbleDiv>
          </>
        )}
      </div>
    );
  } else if (phase == 2) {
    return <CountDown />;
  } else if (phase == 3) {
    return <InPlay />;
  } else if (phase == 4) {
    return <SubmissionPage />;
  }
};

export default Play;
