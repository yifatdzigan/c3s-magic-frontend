
import React, { Component } from 'react';
import MarkdownFromFile from '../MarkdownFromFile';

import { Row } from 'reactstrap';

export default class TailoredProductsHome extends Component {
  render () {
    return (
      <div className='MainViewport'>
        <Row>

          <div className='text'>
            <MarkdownFromFile url={'/contents/TailoredProductsHome.md'} />
          </div>
        </Row>
      </div>);
  }
}
