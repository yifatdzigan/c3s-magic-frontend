import React, { Component } from 'react';
import MarkdownFromFile from './MarkdownFromFile';

import { Row } from 'reactstrap';
import ADAGUCViewerComponent from '../components/ADAGUCViewerComponent';
export default class AdagucViewerContainer extends Component {
  render () {
    return (
      <div className='MainViewport'>
        <Row>

          <div className='text'>
            <ADAGUCViewerComponent parsedLayerCallback={ (wmjsregistry) => {console.log(wmjsregistry); } } stacklayers={true} dapurl='https://localportal.c3s-magic.eu:9000/opendap/c0a5bcec-8db4-477f-930d-88923f6fe3eb/google.108664741257531327255/anomaly_new.nc' />

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
