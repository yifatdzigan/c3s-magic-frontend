// This is where action creators are put
import { SET_BASKET_ITEMS, UPDATE_BASKET_ITEMS, DELETE_BASKET_ITEM } from '../constants/basketLabels';

const setBasketItems = (payload) => {
  return {
    type: SET_BASKET_ITEMS,
    payload: {
      accessToken: payload
    }
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
  return {
    type: DELETE_BASKET_ITEM,
    payload: {
      accessToken: payload.accessToken,
      path: payload.path
    }
  };
};

const actions = {
  setBasketItems,
  updateBasketItems,
  deleteBasketItem
};

export default actions;
