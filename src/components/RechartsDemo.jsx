
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class RechartsDemo extends Component {
  constructor () {
    super();
    this.state = {
    };
  }

  render () {
    return (
      <div className='MainViewport'>
        <h1>Recharts Demo</h1>
      </div>);
  }
}

RechartsDemo.propTypes = {
  accessToken: PropTypes.string,
  domain: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
  actions: PropTypes.object.isRequired,
  nrOfStartedProcesses: PropTypes.number,
  nrOfFailedProcesses: PropTypes.number,
  nrOfCompletedProcesses: PropTypes.number,
  runningProcesses: PropTypes.object.isRequired
};
