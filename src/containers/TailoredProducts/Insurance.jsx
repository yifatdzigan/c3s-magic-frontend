
import React, { Component } from 'react';
import MarkdownFromFile from '../MarkdownFromFile';

import { Row } from 'reactstrap';

export default class Insurance extends Component {
  render () {
    return (
      <div className='MainViewport'>
        <Row>

          <div className='text'>
            <MarkdownFromFile url={'/contents/Insurance.md'} />
          </div>
        </Row>
      </div>);
  }
}
