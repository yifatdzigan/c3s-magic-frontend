
import React, { Component } from 'react';
import MarkdownFromFile from './MarkdownFromFile';

import { Row } from 'reactstrap';

export default class WP1Home extends Component {
  render () {
    return (
      <div className='MainViewport'>
        <Row>
          <div className='text'>
            <MarkdownFromFile url={'/contents/WP1Home.md'} />
          </div>
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
