// This is where action creators are put
import { SET_ACCESS_TOKEN, SET_CLIENT_ID, SET_EMAIL_ADDRESS, SET_BACKEND, SET_COMPUTE } from '../constants/userLabels';

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

const setBackend = (backend) => {
  return {
    type: SET_BACKEND,
    payload: {
      backend: backend
    }
  };
};

const setCompute = (compute) => {
  return {
    type: SET_COMPUTE,
    payload: {
      compute: compute
    }
  };
};

const actions = {
  setAccessToken,
  setClientId,
  setEmailAddress,
  setBackend,
  setCompute
};

export default actions;
