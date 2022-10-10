import { API_URL } from "../config";

//selectors
export const getSearchResult = ({ searchResult }) => searchResult;

// actions
const createActionName = (actionName) => `app/searchResult/${actionName}`;
const UPDATE_RESULTS = () => createActionName("UPDATE_RESULTS");

// action creators
export const updateResults = (payload) => ({ type: UPDATE_RESULTS, payload });

export const fetchByPhrase = (searchPhrase) => {
  return (dispatch) => {
    fetch(API_URL + "api/ads/search/" + searchPhrase)
      .then((res) => res.json())
      .then((ads) => dispatch(updateResults(ads)));
  };
};

const searchResultReducer = (statePart = [], action) => {
  switch (action.type) {
    case UPDATE_RESULTS:
      return [...action.payload];
    default:
      return statePart;
  }
};
export default searchResultReducer;
