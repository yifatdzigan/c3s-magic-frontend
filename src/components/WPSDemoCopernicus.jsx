import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Input, Row, Col } from 'reactstrap';
import { xml2jsonparser } from '../utils/xml2jsonparser';
import RenderProcesses from './RenderProcesses';
import { doWPSCall } from '../utils/WPSRunner';

export default class WPSWranglerDemo extends Component {
  constructor (props) {
    super(props);
    this.wpsExecute = this.wpsExecute.bind(this);
    this.describeProcess = this.describeProcess.bind(this);
    this.state = {
      delay: 10,
      describeProcessDocument: ''
    };
    console.log(props);
  }

  wpsExecute () {
    const { dispatch, actions, nrOfStartedProcesses, compute } = this.props;
    // let wpsUrl = compute.filter(t => t.name === 'copernicus-wps')[0].url
    let wpsUrl = 'https://portal.c3s-magic.eu/copernicus-wps/?';
    dispatch(actions.startWPSExecute(wpsUrl,
      'sleep',
      '[delay=' + this.state.delay + ';]', nrOfStartedProcesses));
  };

  handleChange (name, value) {
    console.log(name, value);
    this.setState({
      [name]: value
    });
  };

  describeProcess () {
    /* Demonstration on how to call the WPS describeprocess part and get its contents as json */
    // const { compute } = this.props;
    // let wpsUrl = compute.filter(t => t.name === 'copernicus-wps')[0].url;
    // console.log(wpsUrl);
    let wpsUrl = 'https://portal.c3s-magic.eu/copernicus-wps/?';
    doWPSCall(wpsUrl + 'service=wps&request=describeprocess&identifier=sleep&version=1.0.0',
      (result) => {
        console.log(JSON.stringify(result, null, 2));
        this.setState({ describeProcessDocument: result });
      }, (error) => {
        console.log(JSON.stringify(error, null, 2));
        this.setState({ describeProcessDocument: error });
      }
    );
  }

  render () {
    const { nrOfStartedProcesses, runningProcesses, nrOfFailedProcesses, nrOfCompletedProcesses } = this.props;
    return (
      <div className='MainViewport'>
        <h1>Copernicus-wps sleep test</h1>
        <Row>
          <Col xs='2'><Input onChange={(event) => { this.handleChange('delay', event.target.value); }} value={this.state.delay} /></Col>
          <Col xs='2'><Button color='primary'onClick={() => { this.wpsExecute(); }}>Start sleep process</Button></Col>
        </Row>
        <RenderProcesses runningProcesses={runningProcesses} />
        <hr />
        <h2>DescribeProcess test </h2>
        <Button onClick={this.describeProcess} >DescribeProcess</Button>
        <p>{JSON.stringify(this.state.describeProcessDocument, null, 2)}</p>
      </div>);
  }
}

WPSWranglerDemo.propTypes = {
  compute: PropTypes.array,
  dispatch: PropTypes.func.isRequired,
  actions: PropTypes.object.isRequired,
  nrOfStartedProcesses: PropTypes.number,
  nrOfFailedProcesses: PropTypes.number,
  nrOfCompletedProcesses: PropTypes.number,
  runningProcesses: PropTypes.object.isRequired
};
