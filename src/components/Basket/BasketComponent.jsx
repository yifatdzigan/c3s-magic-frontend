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
    const { basket, dispatch, actions, accessToken, domain } = this.props;
    return (
      <div style={{ width:'100%', height:'inherit' }} >
        <BasketTreeComponent data={basket} dispatch={dispatch} actions={actions} accessToken={accessToken} domain={domain} />
      </div>
    );
  }
}

BasketComponent.propTypes = {
  basket: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
  actions: PropTypes.object.isRequired,
  accessToken: PropTypes.string,
  domain: PropTypes.string
};
