import { useContext, useState } from "react";

import { AuthContext } from "../../contexts/AuthContext";

import BubbleDiv from "../bubble-div/bubble-div.component";

import "./sign-up.styles.scss";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  const { signUp } = useContext(AuthContext);
  const handleSubmit = () => {
    if (password != rePassword) {
      alert("Passwords do not match");
      return;
    }
    signUp(username, password);
    setUsername("");
    setPassword("");
    setRePassword("");
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
        type='password'
        placeholder='password'
      />
      <input
        value={rePassword}
        onChange={(e) => setRePassword(e.target.value)}
        type='password'
        placeholder='re-password'
      />
      <BubbleDiv onClick={handleSubmit}>Sign Up</BubbleDiv>
    </div>
  );
};

export default SignUp;
