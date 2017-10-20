import React, { Component } from 'react';
import { Container, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import '../../styles/core.scss';

class BaseLayout extends Component {
  render () {
    const { header, mainContent } = this.props;
    return (
      <div className='innerContainer'>
        <Row className='Header' tag='header'>
          {header || 'Oops'}
        </Row>
        <Row className='mainSection' style={{ height:'inherit' }} >
          {mainContent}
        </Row>
      </div>
    );
  }
}

BaseLayout.propTypes = {
  header: PropTypes.element,
  mainContent: PropTypes.element
};

export default BaseLayout;
