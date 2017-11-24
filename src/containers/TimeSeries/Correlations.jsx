
import React, { Component } from 'react';
import { Col, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import KNMIClimpExpCorrelate from '../../components/KNMIClimpExpCorrelate';

export default class Correlations extends Component {
  render () {
    let { dispatch, actions, domain, nrOfStartedProcesses, nrOfFailedProcesses, nrOfCompletedProcesses, runningProcesses } = this.props;
    return (
      <div className='MainViewport'>
        <Row className='MainRow'>
          <Col xs='auto'>
            <KNMIClimpExpCorrelate
              dispatch={dispatch}
              actions={actions}
              domain={domain}
              nrOfStartedProcesses={nrOfStartedProcesses}
              nrOfFailedProcesses={nrOfFailedProcesses}
              nrOfCompletedProcesses={nrOfCompletedProcesses}
              runningProcesses={runningProcesses}
              />
        </Col>
        </Row>
      </div>);
  }
}

Correlations.propTypes = {
  domain: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
  actions: PropTypes.object.isRequired,
  nrOfStartedProcesses: PropTypes.number,
  nrOfFailedProcesses: PropTypes.number,
  nrOfCompletedProcesses: PropTypes.number,
  runningProcesses: PropTypes.object.isRequired
};
