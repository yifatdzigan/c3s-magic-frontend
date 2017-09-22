
import React, { Component } from 'react';
import { Col, Row } from 'reactstrap';
import PropTypes from 'prop-types';

export default class WPSWranglerDemo extends Component {
  constructor () {
    super();
    this.state = {
    };
  }

  render () {
    const { accessToken, emailAddress, clientId, domain } = this.props;
    return (
      <div className='MainViewport'>
        <Row>
          <Col xs='auto'>
            <div className='text'>
              <h1>Welcome to the C3S Magic Science Platform!</h1>
              <p>Currently, the platform is meant to help you in the process of preparing your own data for analysis.
              The platform allows you to enrich your dataset with meteorological variables available in KNMI datasets.</p>
              <p>If your dataset is in CSV (comma-separated values) format and your cases contain a <strong>time</strong> variable and a <strong>spatial </strong>
                one such as a coordinate pair (e.g., longitude and latitude) then you are set to use the data preparation functionalities.
               The platform allows you to add a set of meteorological parameters to your cases for the time and location specified in each of them.</p>
              <p>Have fun!</p>
            </div>
          </Col>
        </Row>
        <Row>
          <Col >
          </Col>
        </Row>
      </div>);
  }
}

WPSWranglerDemo.propTypes = {
  accessToken: PropTypes.string,
  emailAddress: PropTypes.string,
  clientId: PropTypes.string,
  domain: PropTypes.string
};
