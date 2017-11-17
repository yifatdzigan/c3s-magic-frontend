
import React, { Component } from 'react';
import { Col, Row } from 'reactstrap';

export default class WP1Home extends Component {
  constructor () {
    super();
    this.state = {
    };
  }

  render () {
    return (
      <div className='MainViewport'>
        <Row>
          <Col xs='auto'>
            <div className='text'>
              <h1>Welcome to the C3S Magic Science Platform</h1>
              <p>Currently, the platform is meant to help you in the process of preparing your own data for analysis.
              The platform allows you to enrich your dataset with meteorological variables available in KNMI datasets.</p>
              <p>If your dataset is in CSV (comma-separated values) format and your cases contain a <strong>time</strong> variable and a <strong>spatial </strong>
                one such as a coordinate pair (e.g., longitude and latitude) then you are set to use the data preparation functionalities.
               The platform allows you to add a set of meteorological parameters to your cases for the time and location specified in each of them.</p>
              <p>Have fun!</p>
            </div>
          </Col>
        </Row>
      </div>);
  }
}

/*

WP4 - Metrics
 - Mean state
 - Climate variability
 - Extreme events

WP5 - MMP
 - Sub ensemble selections
 - Future climate

WP6 - Timeseries
 - Indices on area averages
 - Spatio temporal analyses
 - Correlations

 WP7 - Tailored products
 - User consultations
 - Coastal areas
 - Water / Hydrology
 - Energy
 - Insurance

 */
