import { createStore, combineReducers } from "redux";

import placesReducer from "./reducers/places";

const rootReduce = combineReducers({
  places: placesReducer
});

const configureStore = () => {
  return createStore(rootReduce);
};

export default configureStore;
