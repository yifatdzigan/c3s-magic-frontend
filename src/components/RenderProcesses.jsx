import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Progress, Card } from 'reactstrap';
import ImagePreview from './ImagePreview';

export default class RenderProcesses extends Component {
  renderProcess (process) {
    // console.log('RenderProcesses::renderProcess(process)');
    // console.log(process);
    let value = '-';
    let shown = '-';
    try {
      value = 'data:image/png;base64,' + process.result.ExecuteResponse.ProcessOutputs.Output.Data.ComplexData.value;
      shown = 'click for output';
    } catch (e) {
    }
    return (
      <Card>
        <Row>
          <Col> <div className='text-center'>{process.percentageComplete} </div><Progress value={process.percentageComplete} /></Col>
          <Col>{process.message}</Col>
          <Col style={{ backgroundColor: '#d9edf7', cursor: 'pointer', color: '#31708f' }} onClick={() => { this.props.resultClickCallback(value); }}>{shown}</Col>
        </Row>
      </Card>
    );
  }

  iterProcesses (runningProcesses) {
    let result = [];
    for (var process in runningProcesses) {
      result.push(Object.assign({}, this.renderProcess(runningProcesses[process]), { key: process }));
    };
    return result;
  }
  render () {
    const { runningProcesses } = this.props;
    return (<span>{this.iterProcesses(runningProcesses)}</span>);
  }
};

RenderProcesses.propTypes = {
  runningProcesses: PropTypes.object.isRequired,
  resultClickCallback: PropTypes.func.isRequired
};
