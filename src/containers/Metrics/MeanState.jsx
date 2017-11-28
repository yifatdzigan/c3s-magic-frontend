
import React, { Component } from 'react';
import MarkdownFromFile from '../MarkdownFromFile';

import { Row } from 'reactstrap';

export default class MeanState extends Component {
  render () {
    return (
      <div className='MainViewport'>
        <Row>

          <div className='text'>
            <MarkdownFromFile url={'/contents/MeanState.md'} />
          </div>
        </Row>
      </div>);
  }
}