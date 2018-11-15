
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
      <div className='MainViewportNoOverflow'>
        <Row style={{height:'100%'}}>
          <Col xs='2'>
            <h1>Explore Data</h1>
            <p>
              The Metrics and Diagnostics in this portal can be used to asses the quality and applicability of climate projection data, as part of <a href='https://cmip.llnl.gov/cmip5/' target='_blank'>CMIP5.</a>
            </p>
            <p>
              In the <a href='https://cds.climate.copernicus.eu/' target='_blank'>Climate Data Store</a> a quality controlled subset of CMIP5 is provided by the <a href='https://cp4cds-qcapp.ceda.ac.uk/' target='_blank'>CP4CDS project.</a>
            </p>
            <p>
              This search interface connects to the <a href='https://cp4cds-index1.ceda.ac.uk/projects/cp4cds_ceda/' target='_blank'>CP4CDS infrastructure</a>, and allows for exploration, viewing, and downloading of the data provided by the CP4CDS project.
            </p>            
          </Col>
          <Col xs='8'>
            <iframe className='esgfsearchframe' type='text/html'
                src = {'https://compute-test.c3s-magic.eu/esgfsearch/esgfsearch.html#'}
                frameBorder = '0' allowFullScreen />
          </Col>
          <Col xs='2'>
          </Col>
        </Row>
      </div>);
  }
}

RechartsDemo.propTypes = {
};
