import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import initialState from "./initialState";
import adsReducer from "./adsRedux";
import usersReducer from "./usersRedux";
import searchResultReducer from "./searchResultRedux";

const subreducers = {
  ads: adsReducer,
  user: usersReducer,
  searchResult: searchResultReducer,
};

const reducer = combineReducers(subreducers);
const store = createStore(
  reducer,
  initialState,
  compose(applyMiddleware(thunk))
);

export default store;
