import React, { Component } from 'react';
import { Container, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import '../../styles/core.scss';

class BaseLayout extends Component {
  render () {
    const { header, mainContent } = this.props;
    return (
      <Container fluid>
        {header || 'Oops'}
        <Row className='show-grid scrollAreaPageWidth'>
          <div className='page-layout__viewport'>
            {mainContent}
          </div>
        </Row>
      </Container>
    );
  }
}

BaseLayout.propTypes = {
  header: PropTypes.element,
  mainContent: PropTypes.element
};

export default BaseLayout;
