
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Input, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Row, Col, Progress, Card, Form, FormGroup, FormControl, ControlLabel } from 'reactstrap';

class RenderProcesses extends Component {
  renderProcess (process) {
    console.log(process);
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

export default class KNMIClimpExpCorrelate extends Component {
  constructor () {
    super();
    this.wrangleClicked = this.wrangleClicked.bind(this);
    this.toggle = this.toggle.bind(this);
    this.dropDownSelectItem = this.dropDownSelectItem.bind(this);
    this.state = {
      dropdownOpen: false,
      dropDownValue: 'add',
      inputa: 10,
      inputb: 20,
      inputs: {
  "netcdf_source1": {
    "default": "/usr/people/mihajlov/climexp/DATA/cru_ts3.22.1901.2013.pre.dat.nc",
    "abstract": "application/netcdf",
    "identifier": "netcdf_source1",
    "values": null,
    "title": "Copy input: Input 1 netCDF opendap."
  },
  "netcdf_source2": {
    "default": "/usr/people/mihajlov/climexp/DATA/nino3.nc",
    "abstract": "application/netcdf",
    "identifier": "netcdf_source2",
    "values": null,
    "title": "Copy input: Input 2 netCDF opendap."
  },
  "ratio": {
    "default": "1:12",
    "identifier": "ratio",
    "values": null,
    "title": "Ratio"
  },
  "netcdf_target": {
    "default": "out.nc",
    "identifier": "netcdf_target",
    "values": null,
    "title": "Output netCDF."
  },
  "average": {
    "default": "ave",
    "identifier": "average",
    "values": null,
    "title": "Average"
  },
  "tags": {
    "default": "c3s-422-Lot2",
    "identifier": "tags",
    "values": null,
    "title": "User Defined Tags CLIPC user tags."
  },
  "frequency": {
    "default": "mon",
    "identifier": "frequency",
    "values": null,
    "title": "Frequency"
  },
  "var": {
    "default": "3",
    "identifier": "var",
    "values": null,
    "title": "var"
  }
}
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
    const { dispatch, actions, nrOfStartedProcesses, domain } = this.props;

    let dataInputs = '';
    Object.keys(this.state.inputs).map(
      (key, value2) => {
        if (dataInputs.length > 0) {
          dataInputs += ';';
        }
        dataInputs += this.state.inputs[key].identifier + '=' + this.state.inputs[key].default;
      }
    );
    console.log(domain, dataInputs);
    dispatch(actions.startWPSExecute(domain, 'climexp',
      dataInputs,
      nrOfStartedProcesses));
  };

  // calculateClicked () {
  //   const { accessToken, dispatch, actions, nrOfStartedProcesses, domain } = this.props;
  //   dispatch(actions.startWPSExecute(domain, accessToken, 'binaryoperatorfornumbers_10sec',
  //     '[inputa=' + this.state.inputa + ';inputb=' + this.state.inputb + ';operator=' + this.state.dropDownValue + ';]', nrOfStartedProcesses));
  // };

  handleChange (name, value) {
    console.log(name, value);
    this.setState({
      [name]: value
    });
  };

  handleWPSInputChange (name, value) {
    console.log(name, value);
    let inputs = Object.assign({}, this.state.inputs);
    inputs[name]['default'] = value;
    this.setState({
      inputs:inputs
    });
  };

  render () {
    const { domain, runningProcesses } = this.props;

    if (!domain) {
      return (<div>Not signed in.</div>);
    }

    console.log(this.state.inputs);
    return (
      <div className='MainViewport'>
        <h1>Correlate with a time series!</h1>
        <span>Your compute node = {domain}</span>
        <div className='WPSCalculatorForm'>
          { Object.keys(this.state.inputs).map(
            (key, value2) => {
              let value = this.state.inputs[key];
              console.log(value);
              console.log(value.identifier);
              if (!value.identifier || !value.title) {
                return (<span>bla</span>);
              }
              console.log(key, value2, value.identifier);
              return (
                <Row>
                  <Col componentClass={ControlLabel}>
                    {value.title}
                  </Col>
                  <Col>
                    <Input onChange={(event) => { this.handleWPSInputChange(value.identifier, event.target.value); }} value={value.default} />
                  </Col>
                </Row>
              );
            })
          }
        </div>
        <Row>
          <Col xs='2'><Button color='primary' id='wrangleButton' onClick={() => { this.wrangleClicked(); }}>Correlate</Button></Col>
        </Row>
        <RenderProcesses runningProcesses={runningProcesses} />
      </div>);
  }
}

KNMIClimpExpCorrelate.propTypes = {
  domain: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
  actions: PropTypes.object.isRequired,
  nrOfStartedProcesses: PropTypes.number,
  nrOfFailedProcesses: PropTypes.number,
  nrOfCompletedProcesses: PropTypes.number,
  runningProcesses: PropTypes.object.isRequired
};
