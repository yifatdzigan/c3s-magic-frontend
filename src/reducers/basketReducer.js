import { SET_BASKET_ITEMS, UPDATE_BASKET_ITEMS, DELETE_BASKET_ITEM, FETCH_BASKET_ITEMS } from '../constants/basketLabels';
import { getConfig } from '../getConfig';
let config = getConfig();

const setBasketItems = (state, payload) => {
  console.log('fetchBasketItems', payload);
  return Object.assign({}, state, { basket: payload.basket, isFetching: false, hasFetched: true });
};

const fetchBasketItems = (state, payload) => {
  console.log('fetchBasketItems', payload);
  if (state.isFetching === true) {
    console.log('Already fetching');
    return Object.assign({}, state);
  }
  let result = null;
  fetch(config.backendHost + '/basket/list', {
    credentials: 'include'
  }).then((result) => {
    console.log(result);
    if (result.ok) {
      return result.json();
    } else {
      return null;
    }
  }).then((json) => {
    console.log(json);
    result = json;
    console.log('starting dispatch', payload);
    if (payload) {
      payload.dispatch(payload.actions.setBasketItems(result));
    }
  });

  return Object.assign({}, state, { isFetching: true, hasFetched: false });
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
  fetch(config.backendHost + '/basket/remove?key=' + accessToken + '&path=' + path).then((result) => {
    if (result.ok) {
      return result.json();
    } else {
      return null;
    }
  }).then((json) => {
    console.log('Info deleting path \'' + path + '\'');
    console.log(json);
  });
  return Object.assign({}, state, { hasFetched: false });
};

const ACTION_HANDLERS = {
  [SET_BASKET_ITEMS] : (state, action) => setBasketItems(state, action.payload),
  [UPDATE_BASKET_ITEMS] : (state, action) => updateBasket(state, action.payload),
  [DELETE_BASKET_ITEM] : (state, action) => deleteBasketItem(state, action.payload),
  [FETCH_BASKET_ITEMS] : (state, action) => fetchBasketItems(state, action.payload)
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
