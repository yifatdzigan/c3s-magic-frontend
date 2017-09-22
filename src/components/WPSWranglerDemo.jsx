
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Input, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Row, Col, Progress, Card } from 'reactstrap';

class RenderProcesses extends Component {
  renderProcess (process) {
    // console.log(process);
    let value = '-';
    try {
      value = process.result.ExecuteResponse.ProcessOutputs.Output.Data.LiteralData.value;
    } catch (e) {
    }
    return (
      <Card>
        <Row>
          <Col> <div className='text-center'>{process.percentageComplete} </div><Progress value={process.percentageComplete} /></Col>
          <Col>{process.message}</Col>
          <Col>{value}</Col>
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
  runningProcesses: PropTypes.object.isRequired
};

export default class WPSWranglerDemo extends Component {
  constructor () {
    super();
    this.wrangleClicked = this.wrangleClicked.bind(this);
    this.toggle = this.toggle.bind(this);
    this.dropDownSelectItem = this.dropDownSelectItem.bind(this);
    this.state = {
      dropdownOpen: false,
      dropDownValue: 'add',
      inputa: 10,
      inputb: 20
    };
  }

  toggle (e) {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  dropDownSelectItem (value) {
    this.setState({
      dropDownValue: value
    });
  };

  wrangleClicked (id) {
    const { accessToken, dispatch, actions, nrOfStartedProcesses, domain } = this.props;

    let dataInputs =
      'inputCSVPath=ExportOngevalsData.csv;' +
      'metaCSVPath=metaDataCsv.json;' +
      'dataURL=http%3A%2F%2Fopendap.knmi.nl%2Fknmi%2Fthredds%2FdodsC%2FDATALAB%2Fhackathon%2FradarFullWholeData.nc;' +
      'dataVariables=image1_image_data;' +
      'limit=10';

    dispatch(actions.startWPSExecute(domain, accessToken, 'wrangleProcess',
      dataInputs,
      nrOfStartedProcesses));
  };

  calculateClicked () {
    const { accessToken, dispatch, actions, nrOfStartedProcesses, domain } = this.props;
    dispatch(actions.startWPSExecute(domain, accessToken, 'binaryoperatorfornumbers_10sec',
      '[inputa=' + this.state.inputa + ';inputb=' + this.state.inputb + ';operator=' + this.state.dropDownValue + ';]', nrOfStartedProcesses));
  };

  handleChange (name, value) {
    console.log(name, value);
    this.setState({
      [name]: value
    });
  };

  render () {
    const { accessToken, nrOfStartedProcesses, runningProcesses, nrOfFailedProcesses, nrOfCompletedProcesses } = this.props;
    return (
      <div className='MainViewport'>
        <h1>WPS Demo</h1>
        <p>{accessToken}</p>
        <p><Button id='wrangleButton' onClick={() => { this.wrangleClicked('wrangleProcess'); }}>Wrangle!</Button></p>
        <Row>
          <Col xs='2'><Input onChange={(event) => { this.handleChange('inputa', event.target.value); }} value={this.state.inputa} /></Col>
          <Col xs='2'>
            <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
              <DropdownToggle caret >
                { this.state.dropDownValue }
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem onClick={(e) => { this.dropDownSelectItem('add'); }}>add</DropdownItem>
                <DropdownItem onClick={(e) => { this.dropDownSelectItem('divide'); }}>divide</DropdownItem>
                <DropdownItem onClick={(e) => { this.dropDownSelectItem('substract'); }}>substract</DropdownItem>
                <DropdownItem onClick={(e) => { this.dropDownSelectItem('multiply'); }}>multiply</DropdownItem>
              </DropdownMenu>
            </ButtonDropdown>
          </Col>
          <Col xs='2'><Input onChange={(event) => { this.handleChange('inputb', event.target.value); }} value={this.state.inputb} /></Col>
          <Col xs='2'><Button color='primary' id='wrangleButton' onClick={() => { this.calculateClicked(); }}>Calculate</Button></Col>
        </Row>
        <p>nrOfStartedProcesses: {nrOfStartedProcesses}</p>
        <p>nrOfFailedProcesses: {nrOfFailedProcesses}</p>
        <p>nrOfCompletedProcesses: {nrOfCompletedProcesses}</p>
        <RenderProcesses runningProcesses={runningProcesses} />
      </div>);
  }
}

WPSWranglerDemo.propTypes = {
  accessToken: PropTypes.string,
  domain: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
  actions: PropTypes.object.isRequired,
  nrOfStartedProcesses: PropTypes.number,
  nrOfFailedProcesses: PropTypes.number,
  nrOfCompletedProcesses: PropTypes.number,
  runningProcesses: PropTypes.object.isRequired
};
