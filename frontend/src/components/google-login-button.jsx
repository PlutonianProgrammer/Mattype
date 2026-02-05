import { useContext, useEffect } from "react";

import { AuthContext } from "../contexts/AuthContext";

const GoogleLoginButton = () => {
  const { setAccessToken, setRefreshToken } = useContext(AuthContext);
  useEffect(() => {
    const handleCredentialResponse = async (response) => {
      const idToken = response.credential;
      const backendResponse = await fetch(
        process.env.REACT_APP_BACKEND_URL + "/userauth/google-auth/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id_token: idToken }),
        },
      );
      if (!backendResponse.ok) {
        console.log("google auth failed");
        return;
      }
      const data = await backendResponse.json();
      setAccessToken(data.access);
      setRefreshToken(data.refresh);
    };

    if (window.google) {
      /* global google */

      window.google.accounts.id.initialize({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        callback: handleCredentialResponse,
      });

      window.google.accounts.id.renderButton(
        document.getElementById("google-button"),
        {
          theme: "outline",
          size: "large",
        },
      );
    }
  }, []);

  return <div id='google-button'></div>;
};

export default GoogleLoginButton;
