export const TRY_AUTH = "TRY_AUTH";
export const AUTH_SET_TOKEN = "AUTH_SET_TOKEN";
import { uiStartLoading, uiStopLoading } from "./actions";
import startMainTabs from "../screens/MainTabs/startMainTabs";

export const tryAuth = (authData, authMode) => {
  return dispatch => {
    dispatch(uiStartLoading());
    const apiKey = "AIzaSyALDaJWwNrGrfe1E9IyUI_CxzO8LDtZYJU";
    let url =
      "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=" +
      apiKey;

    if (authMode === "signup") {
      url =
        "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=" +
        apiKey;
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
      }),
      header: {
        "Content-type": "application-json"
      }
    })
      .catch(err => {
        console.log(err);
        alert("Authentication failed, please try again!");
        dispatch(uiStopLoading());
      })
      .then(res => res.json())
      .then(parsedRes => {
        dispatch(uiStopLoading());
        if (!parsedRes.idToken) {
          alert("Authentication failed, please try again!");
        } else {
          dispatch(auhSetToken(parsedRes.idToken));
          startMainTabs();
        }
      });
  };
};

export const auhSetToken = token => {
  return {
    type: AUTH_SET_TOKEN,
    token
  };
};

export const authGetToken = () => {
  return (dispatch, getState) => {
    const token = new Promise((resolve, reject) => {
      if (!token) reject();
      else resolve(token);
    });
  };
};
