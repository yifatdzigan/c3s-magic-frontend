
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { XAxis, YAxis, Tooltip, CartesianGrid, LabelList, ScatterChart, Scatter, Cell } from 'recharts';
import { Button, Row, Col, Alert } from 'reactstrap';

export default class RechartsDemo extends Component {
  constructor () {
    super();
  }
  render () {
    return (
      <div className='MainViewport'>
        <h1 style={{float:'left'}}>Search</h1>
        <iframe className='esgfsearchframe' type='text/html'
            src = {'/search/esgfsearch.html'}
            frameBorder = '0' allowFullScreen />
      </div>);
  }
}

RechartsDemo.propTypes = {
};
