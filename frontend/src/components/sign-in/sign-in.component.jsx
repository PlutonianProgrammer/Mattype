import { useContext, useState } from "react";

import { AuthContext } from "../../contexts/AuthContext";

import BubbleDiv from "../bubble-div/bubble-div.component";

import "./sign-in.styles.scss";

const SignIn = () => {
  const { login } = useContext(AuthContext);
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
        onChange={(e) => setPassword(e.target.value)}
        placeholder='password'
      />
      <BubbleDiv>
        <button onClick={handleSubmit}>Sign In</button>
      </BubbleDiv>
      <BubbleDiv id='google-button'>
        <button>Sign In With Google</button>
      </BubbleDiv>
    </div>
  );
};

export default SignIn;
