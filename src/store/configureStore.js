import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import placesReducer from "./placesReducer";
import uiReducer from "./uiReducer";

const rootReduce = combineReducers({
  places: placesReducer,
  ui: uiReducer
});

let composeEnhancers = compose;

if (__DEV__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const configureStore = () => {
  return createStore(rootReduce, composeEnhancers(applyMiddleware(thunk)));
};

export default configureStore;
