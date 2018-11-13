
import React, { Component } from 'react';
import MarkdownFromFile from './MarkdownFromFile';
import EnsembleAnomalyPlots from '../containers/Diagnostics/EnsembleAnomalyPlots';

import { Row, Col } from 'reactstrap';

export default class WP1Home extends Component {
  render () {
    return (
      <div className='MainViewport'>
        <Row>
          <Col xs='2'></Col>
          <Col xs='8'>
            <Row>
              <MarkdownFromFile url={'/contents/Home.md'} />
            </Row>
            <Row>
              <EnsembleAnomalyPlots showSlider map_data={'https://portal.c3s-magic.eu/backend/wms?DATASET=anomaly_agreement_stippling&'} />
            </Row>
          </Col>
          <Col xs='2'></Col>
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
