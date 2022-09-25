import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import adsReducer from "./adsRedux";

const subreducers = {
  ads: adsReducer,
};

const reducer = combineReducers(subreducers);
const store = createStore(reducer, compose(applyMiddleware(thunk)));

export default store;
