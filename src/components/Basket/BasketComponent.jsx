import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BasketTreeComponent from './BasketTreeComponent';

export default class BasketComponent extends Component {
  constructor (props) {
    super(props);
    const { dispatch, actions } = props;
    if (!props.basket) {
      dispatch(actions.fetchBasketItems(props));
    }
  }

  render () {
    const { basket, dispatch, actions, accessToken, backend } = this.props;
    return (
      <BasketTreeComponent data={basket} dispatch={dispatch} actions={actions} accessToken={accessToken} backend={backend} />
    );
  }
}

BasketComponent.propTypes = {
  basket: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
  actions: PropTypes.object.isRequired,
  accessToken: PropTypes.string,
  backend: PropTypes.string
};
