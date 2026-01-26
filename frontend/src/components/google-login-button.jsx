import { useContext, useEffect } from "react";

import { AuthContext } from "../contexts/AuthContext";

const GoogleLoginButton = () => {
  const { setAccessToken, setRefreshToken } = useContext(AuthContext);
  useEffect(() => {
    /* global google */

    google.accounts.id.initialize({
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      callback: handleCredentialResponse,
    });

    google.accounts.id.renderButton(document.getElementById("google-button"), {
      theme: "outline",
      size: "large",
    });
  }, []);

  const handleCredentialResponse = async (response) => {
    const idToken = response.credential;
    const backendResponse = await fetch(
      "http://localhost:8000/userauth/google-auth/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id_token: idToken }),
      },
    );
    const data = await backendResponse.json();
    setAccessToken(data.access);
    setRefreshToken(data.refresh);
  };
  return <div id='google-button'></div>;
};

export default GoogleLoginButton;
