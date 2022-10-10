import { API_URL } from "../config";
console.log("API_URL:", API_URL);
console.log("NODE_ENV:", process.env.NODE_ENV);

//selectors
export const getAllAds = ({ ads }) => ads;
export const getAdById = ({ ads }, id) => ads.find((ad) => ad._id === id);

// actions
const createActionName = (actionName) => `app/ads/${actionName}`;
const UPDATE_ADS = () => createActionName("UPDATE_ADS");
const EDIT_AD = () => createActionName("EDIT_AD");
const REMOVE_AD = () => createActionName("REMOVE_AD");
const SEARCH_ADS = () => createActionName("SEARCH_ADS");

// action creators
export const updateAds = (payload) => ({ type: UPDATE_ADS, payload });
export const editAd = (payload) => ({ type: EDIT_AD, payload });
export const removeAd = (payload) => ({ type: REMOVE_AD, payload });
export const searchAd = (searchPhrase) => ({
  type: SEARCH_ADS,
  payload: { searchPhrase },
});

export const fetchAds = () => {
  return (dispatch) => {
    fetch(`${API_URL}api/ads`)
      .then((res) => res.json())
      .then((ads) => dispatch(updateAds(ads)));
  };
};

export const fetchByPhrase = (searchPhrase) => {
  return (dispatch) => {
    fetch(API_URL + "api/ads/search/" + searchPhrase)
      .then((res) => res.json())
      .then((ads) => dispatch(updateAds(ads)));
    dispatch(searchAd(searchPhrase));
  };
};

export const removeAdData = (payload) => {
  return (dispatch) => {
    const options = {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    };
    fetch(`${API_URL}api/ads/${payload}`, options).then(() =>
      dispatch(removeAd(payload))
    );
  };
};

const adsReducer = (statePart = [], action) => {
  switch (action.type) {
    case UPDATE_ADS:
      return [...action.payload];
    case EDIT_AD:
      return statePart.map((ad) =>
        ad.id === action.payload.id ? { ...ad, ...action.payload } : ad
      );
    case REMOVE_AD:
      return statePart.filter((ad) => ad._id !== action.payload);
    case SEARCH_ADS:
      return statePart.filter((ad) => ad.title.includes(action.payload));
    default:
      return statePart;
  }
};
export default adsReducer;
