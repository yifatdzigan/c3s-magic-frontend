
import React, { Component } from 'react';
import ADAGUCViewerComponent from '../components/ADAGUCViewerComponent';
import PropTypes from 'prop-types';
import { Button, Input, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Row, Col, Progress, Card } from 'reactstrap';
import ReactSlider from 'react-slider';
import { withRouter } from 'react-router'
import { debounce } from 'throttle-debounce';

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

class WPSWranglerDemo extends Component {
  constructor (props) {
    super(props);
    this.wrangleClicked = this.wrangleClicked.bind(this);
    this.toggle = this.toggle.bind(this);
    this.dropDownSelectItem = this.dropDownSelectItem.bind(this);
    this.state = {
      dropdownOpen: false,
      dropDownValue: 'add',
      inputa: 10,
      inputb: 20,
      currentValue: 0,
      changeValue: 0,
      step: 1,
      min: 0,
      max:100,

    };
    this.wmjsregistry = {};
    this.initialized = false;

    this.handleSliderChange = this.handleSliderChange.bind(this);
    this.debouncedHandleSliderChange = debounce(25, this.debouncedHandleSliderChange);
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

    let dataInputs =
      'inputCSVPath=ExportOngevalsData.csv;' +
      'metaCSVPath=metaDataCsv.json;' +
      'dataURL=http%3A%2F%2Fopendap.knmi.nl%2Fknmi%2Fthredds%2FdodsC%2FDATALAB%2Fhackathon%2FradarFullWholeData.nc;' +
      'dataVariables=image1_image_data;' +
      'limit=10';

    dispatch(actions.startWPSExecute(domain, 'wrangleProcess',
      dataInputs,
      nrOfStartedProcesses));
  };

  calculateClicked () {
    const { dispatch, actions, nrOfStartedProcesses, domain } = this.props;
    dispatch(actions.startWPSExecute(domain, 'binaryoperatorfornumbers_10sec',
      '[inputa=' + this.state.inputa + ';inputb=' + this.state.inputb + ';operator=' + this.state.dropDownValue + ';]', nrOfStartedProcesses));
  };

  handleChange (name, value) {
    console.log(name, value);
    this.setState({
      [name]: value
    });
    if (name === 'inputa') {
      let anomalyLayer = this.wmjsregistry.anomaly.getLayers()[0];
      anomalyLayer.wmsextensions({colorscalerange:0 + ' ,' + parseInt(value)});
      console.log(this.wmjsregistry.anomaly.getLayers()[0]);
    }
  };

  debouncedHandleSliderChange (v) {
    this.handleSliderChange(v);
  }

  handleSliderChange (v) {
    this.setState({currentValue:v});
    if (! this.wmjsregistry || ! this.wmjsregistry.anomaly){
      console.log('No this.wmjsregistry');
      return;
    }
    let anomalyLayer = this.wmjsregistry.anomaly.getLayers()[0];
    anomalyLayer.legendGraphic = '';
    anomalyLayer.wmsextensions({colorscalerange:0 + ' ,' + (100 - parseInt(v / 1) * 1)});
    this.wmjsregistry.anomaly.draw();

  }

  render () {
    const { nrOfStartedProcesses, runningProcesses, nrOfFailedProcesses, nrOfCompletedProcesses } = this.props;
    return (
      <div className='MainViewport'>
        <Button style={{float:'right'}} color='link' onClick={() => {this.props.router.push('/');} }>(back)</Button>
        <h1>Ensemble anomaly plots</h1>

        <ADAGUCViewerComponent
          height2={'50vh'}
          height={'500px'}
          stacklayers={true}
          wmsurl={config.backendHost + '/wms?DATASET=anomaly_agreement_stippling&'}
          parsedLayerCallback={ (wmjsregistry) => {
            // console.log(wmjsregistry);
            this.wmjsregistry = wmjsregistry;
            if (!this.initialized) {
              this.initialized = true;
              this.wmjsregistry.anomaly.getLayers()[0].zoomToLayer(); } }
            }
        />
        <Row>
        <Col xs='5'>Stippling (% of members agreeing):</Col>
        </Row>
        <Row>
          { /* <Col xs='2'><Input onChange={(event) => { this.handleChange('inputa', event.target.value); }} value={this.state.inputa} /></Col> */ }


          <Col xs='11'>
            <ReactSlider className={'horizontal-slider'} defaultValue={this.state.currentValue} onChange={(v) =>{this.debouncedHandleSliderChange(v);}} />
          </Col>
          <Col xs='1'>{this.state.currentValue} %</Col>

        </Row>

      </div>);
  }
}

WPSWranglerDemo.propTypes = {
  accessToken: PropTypes.string,
  domain: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
  actions: PropTypes.object.isRequired,
  router: PropTypes.object,
  nrOfStartedProcesses: PropTypes.number,
  nrOfFailedProcesses: PropTypes.number,
  nrOfCompletedProcesses: PropTypes.number,
  runningProcesses: PropTypes.object.isRequired
};

export default withRouter(WPSWranglerDemo);
