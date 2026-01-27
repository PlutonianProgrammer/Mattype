import { PlayContext } from "../../contexts/PlayContext";
import CountDown from "../../components/countdown/countdown.component";
import InPlay from "../../components/in-play/in-play.component";
import SubmissionPage from "../../components/submission-page/submission-page.component";
import BubbleDiv from "../../components/bubble-div/bubble-div.component";
import "./play.styles.scss";
import GoogleLoginButton from "../../components/google-login-button";

import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

const Play = () => {
  const { phase, setPhase, resetState } = useContext(PlayContext);
  const { guestLogin, user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      console.log("RESET");
      resetState();
    };
  }, [resetState]);
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
            <GoogleLoginButton />
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
