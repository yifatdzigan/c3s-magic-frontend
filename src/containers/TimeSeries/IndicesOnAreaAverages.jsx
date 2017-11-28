
import React, { Component } from 'react';
import MarkdownFromFile from '../MarkdownFromFile';

import { Row } from 'reactstrap';

export default class IndicesOnAreaAverages extends Component {
  render () {
    return (
      <div className='MainViewport'>
        <Row>

          <div className='text'>
            <MarkdownFromFile url={'/contents/IndicesOnAreaAverages.md'} />
          </div>
        </Row>
      </div>);
  }
}
