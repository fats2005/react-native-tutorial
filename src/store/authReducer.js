import { AUTH_SET_TOKEN } from "./authActions";

const initialState = {
  token: null
};

const reducer = (state = initialState, actions) => {
  switch (actions.type) {
    case AUTH_SET_TOKEN:
      return {
        ...state,
        token: actions.token
      };
    default:
      return state;
  }
};

export default reducer;
