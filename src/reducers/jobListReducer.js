import { UPDATE_JOBLIST_ITEMS } from '../constants/jobListLabels';

const updateJobListItems = (state, payload) => {
  if (JSON.stringify(state.jobs) !== JSON.stringify(payload.jsonResponse.jobs)) {
    return Object.assign({}, state, { jobs: payload.jsonResponse.jobs });
  }
  return Object.assign({}, state);
};

const ACTION_HANDLERS = {
  [UPDATE_JOBLIST_ITEMS] : (state, action) => updateJobListItems(state, action.payload)
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
