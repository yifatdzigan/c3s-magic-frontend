// This is where action creators are put
import { SET_BASKET_ITEMS, UPDATE_BASKET_ITEMS, DELETE_BASKET_ITEM, FETCH_BASKET_ITEMS } from '../constants/basketLabels';

const setBasketItems = (payload) => {
  return {
    type: SET_BASKET_ITEMS,
    payload: {
      basket: payload,
      isFetching: false
    }
  };
};

const fetchBasketItems = (payload) => {
  return {
    type: FETCH_BASKET_ITEMS,
    payload: payload
  };
};

const updateBasketItems = (payload) => {
  return {
    type: UPDATE_BASKET_ITEMS,
    payload: {
      jsonResponse: payload
    }
  };
};

const deleteBasketItem = (payload) => {
  console.log(payload);
  return {
    type: DELETE_BASKET_ITEM,
    payload: {
      accessToken: payload.accessToken,
      path: payload.path,
      actions:payload.actions,
      dispatch:payload.dispatch
    }
  };
};

const actions = {
  setBasketItems,
  updateBasketItems,
  deleteBasketItem,
  fetchBasketItems
};

export default actions;
