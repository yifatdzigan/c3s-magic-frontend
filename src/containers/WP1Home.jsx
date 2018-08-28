
import React, { Component } from 'react';
import MarkdownFromFile from './MarkdownFromFile';
import EnsembleAnomalyPlots from '../containers/Diagnostics/EnsembleAnomalyPlots';

import { Row, Col } from 'reactstrap';

export default class WP1Home extends Component {
  render () {
    return (
      <div className='MainViewport'>
        <Row>
          <Col xs='6'>
            <div className='text'>
              <MarkdownFromFile url={'/contents/Home.md'} />
            </div>
          </Col>
          <Col xs='6'>
            <EnsembleAnomalyPlots showSlider map_data={'https://portal.c3s-magic.eu/backend/wms?DATASET=anomaly_agreement_stippling&'} />
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
