import React, { Component } from 'react';
import MarkdownFromFile from './MarkdownFromFile';

import { Row } from 'reactstrap';

export default class WP1Home extends Component {
  render () {
    return (
      <div className='MainViewport'>
        <Row>

          <div className='text'>
            <h1>Diagnostics page</h1>
            ... in development ...
            <div>
              <a href='#/ensembleanomalyplots'>Ensemble Anomaly Plots</a>
            </div>
          </div>
        </Row>
      </div>);
  }
}
