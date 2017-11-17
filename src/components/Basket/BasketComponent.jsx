import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BasketTreeComponent from './BasketTreeComponent';

export default class BasketComponent extends Component {
  // componentWillMount () {
  //   const { dispatch, actions } = this.props;
  //   dispatch(actions.fetchBasketItems(this.props));
  // }
  constructor (props) {
    super(props);
    const { dispatch, actions } = props;
    if (!props.basket) {
      dispatch(actions.fetchBasketItems(props));
    }
  }

  // componentWillUpdate () {
  //   const { dispatch, actions } = this.props;
  //   dispatch(actions.fetchBasketItems(this.props));
  // }

  render () {
    console.log('BasketComponent', this.props);
    const { basket, dispatch, actions } = this.props;

    if (!basket) return (<div className='MainViewport'>Unable to get basket, are you signed in?</div>);
    return (
      basket ? <BasketTreeComponent data={basket} dispatch={dispatch} actions={actions} /> : <div />
    );
  }
}

BasketComponent.propTypes = {
  basket: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
  actions: PropTypes.object.isRequired
};
