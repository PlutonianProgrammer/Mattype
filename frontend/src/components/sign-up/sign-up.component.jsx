import { useContext, useState } from "react";

import { AuthContext } from "../../contexts/AuthContext";

import BubbleDiv from "../bubble-div/bubble-div.component";

import "./sign-up.styles.scss";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [email, setEmail] = useState("");
  const { signUp } = useContext(AuthContext);
  const handleSubmit = () => {
    signUp(username, password);
    setUsername("");
    setPassword("");
    setRePassword("");
    setEmail("");
  };
  return (
    <div className='sign-up-container'>
      <h2>Sign Up</h2>
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
      <input
        value={rePassword}
        onChange={(e) => setRePassword(e.target.value)}
        placeholder='re-password'
      />
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder='email'
      />
      <BubbleDiv>
        <button onClick={handleSubmit}>Sign Up</button>
      </BubbleDiv>
    </div>
  );
};

export default SignUp;
