import { SET_BASKET_ITEMS, UPDATE_BASKET_ITEMS, DELETE_BASKET_ITEM } from '../constants/basketLabels';
import { config } from '../static/config.js';

const setBasketItems = (state, payload) => {
  let result = null;
  const accessToken = payload.accessToken;
  fetch(config.adagucServicesHost + '/basket/list?key=' + accessToken)
    .then((result) => {
      if (result.ok) {
        return result.json();
      } else {
        return null;
      }
    })
    .then((json) => {
      result = json;
    });
  return Object.assign({}, state, { basket: result, hasFetched: true });
};

const updateBasket = (state, payload) => {
  return Object.assign({}, state, { basket: payload, hasFetched: true });
};

/**
 * Deleting an item from the basket.
 **/
const deleteBasketItem = (state, payload) => {
  const accessToken = payload.accessToken;
  const path = payload.path;
  fetch(config.adagucServicesHost + '/basket/remove?key=' + accessToken + '&path=' + path)
  .then((result) => {
    if (result.ok) {
      return result.json();
    } else {
      return null;
    }
  })
  .then((json) => {
    console.log('Info deleting path \'' + path + '\'');
    console.log(json);
  });
  return Object.assign({}, state, { hasFetched: false });
};

const ACTION_HANDLERS = {
  [SET_BASKET_ITEMS] : (state, action) => setBasketItems(state, action.payload),
  [UPDATE_BASKET_ITEMS] : (state, action) => updateBasket(state, action.payload),
  [DELETE_BASKET_ITEM] : (state, action) => deleteBasketItem(state, action.payload)
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = { basket: null, hasFetched: false };
export default function userReducer (state = initialState, action) {
  if (!action) {
    return state;
  }
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
