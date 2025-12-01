import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../contexts/AuthContext";

import SignIn from "../../components/sign-in/sign-in.component";
import SignUp from "../../components/sign-up/sign-up.component";

import "./auth.styles.scss";

const Auth = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  useEffect(() => {
    console.log("USER UPDATED:", user);
    if (user) {
      navigate("/");
    }
  }, [user]);
  if (!user) {
    return (
      <div className='auth-container'>
        <SignIn />
        <SignUp />
      </div>
    );
  } else {
    return <h1>You Must Log Out To Utilize This Page</h1>;
  }
};

export default Auth;
