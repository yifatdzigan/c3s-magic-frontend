import React, { Component } from 'react';
import BasketComponent from '../components/Basket/BasketComponent';
import PropTypes from 'prop-types';

export default class BasketContainer extends Component {
  render () {
    const { accessToken, dispatch, actions, basket, hasFetched,
      backend, selectedCSVFileForWrangling, wpsActions } = this.props;
    return (
      <div className='BasketContainer'>
        <BasketComponent accessToken={accessToken}
          dispatch={dispatch} actions={actions} basket={basket} hasFetched={hasFetched}
          backend={backend} selectedCSVFileForWrangling={selectedCSVFileForWrangling}
          wpsActions={wpsActions} />
      </div>
    );
  }
}

BasketContainer.propTypes = {
  wpsActions: PropTypes.object.isRequired,
  selectedCSVFileForWrangling: PropTypes.string,
  backend: PropTypes.string,
  accessToken: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
  actions: PropTypes.object.isRequired,
  basket: PropTypes.object,
  hasFetched: PropTypes.bool
};
