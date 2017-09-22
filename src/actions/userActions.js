// This is where action creators are put
import { SET_ACCESS_TOKEN, SET_CLIENT_ID, SET_EMAIL_ADDRESS, SET_DOMAIN } from '../constants/userLabels';

const setAccessToken = (token) => {
  return {
    type: SET_ACCESS_TOKEN,
    payload: {
      accessToken: token
    }
  };
};

const setClientId = (id) => {
  return {
    type: SET_CLIENT_ID,
    payload: {
      clientId: id
    }
  };
};

const setEmailAddress = (email) => {
  return {
    type: SET_EMAIL_ADDRESS,
    payload: {
      emailAddress: email
    }
  };
};

const setDomain = (domain) => {
  return {
    type: SET_DOMAIN,
    payload: {
      domain: domain
    }
  };
};

const actions = {
  setAccessToken,
  setClientId,
  setEmailAddress,
  setDomain
};

export default actions;
