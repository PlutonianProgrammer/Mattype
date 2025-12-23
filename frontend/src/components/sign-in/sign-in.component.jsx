import { useContext, useState } from "react";

import { AuthContext } from "../../contexts/AuthContext";

import BubbleDiv from "../bubble-div/bubble-div.component";

import "./sign-in.styles.scss";

const SignIn = () => {
  const { login, guestLogin } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = () => {
    login(username, password);
    setUsername("");
    setPassword("");
  };
  return (
    <div className='sign-in-container'>
      <h2>Sign In</h2>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder='username'
      />
      <input
        value={password}
        type='password'
        onChange={(e) => setPassword(e.target.value)}
        placeholder='password'
      />
      <BubbleDiv onClick={handleSubmit}>Sign In</BubbleDiv>
      <BubbleDiv className='guest-button' onClick={guestLogin}>
        Sign In As Guest
      </BubbleDiv>
      <BubbleDiv className='google-button'>Sign In With Google</BubbleDiv>
    </div>
  );
};

export default SignIn;
