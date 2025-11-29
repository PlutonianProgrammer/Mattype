import { createContext, useState, useEffect } from "react";

const AUTHENTICATION_URL_HEAD = "http://localhost:8000/userauth/auth/";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // useState on access/refresh tokens and user
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("access")
  );
  const [refreshToken, setRefreshToken] = useState(
    localStorage.getItem("refresh")
  );
  const [user, setUser] = useState(null);

  // when accessToken/refreshToken variables affected, change them on browser
  useEffect(() => {
    localStorage.setItem("access", accessToken);
    //console.log("USESTATE ACCESS ON", accessToken);
  }, [accessToken]);
  useEffect(() => {
    localStorage.setItem("refresh", refreshToken);
    //console.log("USESTATE REFRESH ON", refreshToken);
    fetchUser(accessToken);
  }, [refreshToken]);

  const login = async (username, password) => {
    //console.log("LOG IN EXECUTED");
    const response = await fetch(AUTHENTICATION_URL_HEAD + "jwt/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const data = await response.json();
      setAccessToken(data.access);
      setRefreshToken(data.refresh);
      fetchUser(data.access);
    }
  };

  const signUp = async (username, password, re_password, email) => {
    //console.log("SIGN-UP EXECUTED");
    const response = await fetch(AUTHENTICATION_URL_HEAD + "users/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, re_password, email }),
    });
    if (response.ok) {
      login(username, password);
    } else {
      console.log("ERROR IN SIGNUP");
      console.error("Signup failed:", response);
    }
  };

  const logout = () => {
    setAccessToken(null);
    setRefreshToken(null);
    setUser(null);
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
  };

  const refreshAccessToken = async () => {
    // do not call server if refresh token DNE

    if (refreshToken == "null" || refreshToken == null) {
      return;
    }

    //console.log("REFRESHING ACCESS TOKEN");
    // get response from backend
    const response = await fetch(AUTHENTICATION_URL_HEAD + "jwt/refresh/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh: refreshToken }),
    });
    // get access token from response if applicable
    if (response.ok) {
      const data = await response.json();
      setAccessToken(data.access);
      return data.access;
    } else logout();
  };

  const fetchUser = async () => {
    // if both tokens DNE, do not try to fetch

    if (
      (accessToken == "null" || accessToken == null) &&
      (refreshToken == "null" || refreshToken == null)
    ) {
      return;
    }

    // // tries to get userprofile data
    // const helperFetch = async (token) => {
    //   console.log("FETCHING-", token);
    //   const response = await fetch(AUTHENTICATION_URL_HEAD + "users/me/", {
    //     headers: { Authorization: `Bearer ${token}` },
    //   });
    //   return response;
    // };

    // // try to get userprofile data
    // console.log("INITIAL FETCH");
    // let response = await helperFetch(myAccessToken);
    // // if fails, try with refreshed access token
    // if (!response.ok) {
    //   console.log("REFRESHING");
    //   myAccessToken = refreshAccessToken();
    //   console.log("ACCESS TOKEN REFRESHED- FETCHING AGAIN");
    //   response = await helperFetch(myAccessToken);
    // }
    // // if either of the previous attempts work, setUser(data)

    const response = await helperFetch(
      AUTHENTICATION_URL_HEAD + "users/me/",
      "GET",
      null
    );

    if (response.ok) {
      const data = await response.json();
      //console.log("USER DATA:", data);
      setUser(data);
    }
    // neither attempt worked- logout()
    else logout();
  };

  const helperFetch = async (url, method, payload) => {
    const createFetchObj = (token) => {
      const fetchObj = {};

      // method/payload
      if (method == "GET") {
        fetchObj.method = "GET";
      } else if (method == "POST") {
        fetchObj.method = "POST";
        fetchObj.headers = { "Content-Type": "application/json" };
        fetchObj.body = JSON.stringify(payload);
      } else {
        console.log("createFetchObj() NOT PROGRAMMED FOR THIS");
      }

      // auth
      if (token != "null" && token != null) {
        //console.log("TOKEN:", token, typeof token);
        fetchObj.headers = fetchObj.headers || {};
        fetchObj.headers.Authorization = `Bearer ${token}`;
      }
      //console.log("OBJECT:", fetchObj);
      return fetchObj;
    };
    let response = null;

    // Initial Fetch:
    response = await fetch(url, createFetchObj(accessToken));

    // Try again with refresh token if applicable
    if (refreshToken != null || !response.ok) {
      const newAccessToken = await refreshAccessToken();
      response = await fetch(url, createFetchObj(newAccessToken));

      // If another failure
      if (!response.ok) {
        console.log(`FETCHING ${url} FAILED`);
      }
    }

    // return response anyways
    return response;
  };

  return (
    <AuthContext.Provider
      value={{
        user,

        signUp,
        login,
        logout,

        helperFetch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
