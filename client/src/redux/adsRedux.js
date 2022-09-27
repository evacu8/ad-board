import { API_URL } from "../config";
console.log("API_URL:", API_URL);
console.log("NODE_ENV:", process.env.NODE_ENV);

//selectors
export const getAllAds = ({ ads }) => ads;
export const getAdById = ({ ads }, id) => ads.find((ad) => ad.id === id);

// actions
const createActionName = (actionName) => `app/ads/${actionName}`;
const UPDATE_ADS = () => createActionName("UPDATE_ADS");
const EDIT_AD = () => createActionName("EDIT_AD");
const ADD_AD = () => createActionName("ADD_AD");
const REMOVE_AD = () => createActionName("REMOVE_AD");

// action creators
export const updateAds = (payload) => ({ type: UPDATE_ADS, payload });
export const editAd = (payload) => ({ type: EDIT_AD, payload });
export const addNewAd = (payload) => ({ type: ADD_AD, payload });
export const removeAd = (payload) => ({ type: REMOVE_AD, payload });

export const fetchAds = () => {
  return (dispatch) => {
    fetch(`${API_URL}api/ads`)
      .then((res) => res.json())
      .then((ads) => dispatch(updateAds(ads)));
  };
};

export const updateAdData = (payload) => {
  return (dispatch) => {
    const options = {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(payload),
    };
    fetch(`${API_URL}/api/ads/${payload.id}`, options).then(
      dispatch(editAd(payload))
    );
  };
};

export const addAdData = (payload) => {
  return (dispatch) => {
    const options = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(payload),
    };
    fetch(`${API_URL}/api/ads`, options)
      .then(() => dispatch(addNewAd(payload)))
      .then(() => fetchAds());
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
    fetch(`${API_URL}/api/ads/${payload}`, options).then(() =>
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
    case ADD_AD:
      return [...action.payload, ...statePart];
    case REMOVE_AD:
      return statePart.filter((ad) => ad.id !== action.payload);
    default:
      return statePart;
  }
};
export default adsReducer;
