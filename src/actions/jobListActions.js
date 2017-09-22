// This is where action creators are put
import { UPDATE_JOBLIST_ITEMS } from '../constants/jobListLabels';

const updateJobListItems = (payload) => {
  return {
    type: UPDATE_JOBLIST_ITEMS,
    payload: {
      jsonResponse: payload
    }
  };
};

const actions = {
  updateJobListItems
};

export default actions;
