
import React, { Component } from 'react';
import ADAGUCViewerComponent from '../components/ADAGUCViewerComponent';
import PropTypes from 'prop-types';
import { Button, FormGroup, Form, Label, Row, Col } from 'reactstrap';
import ReactSlider from 'react-slider';
import { withRouter } from 'react-router';
import { debounce } from 'throttle-debounce';
import { WMJSLayer, WMJSMap } from 'adaguc-webmapjs';

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
      max:100
    };
    this.webMapJSInstance = {};
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
    const { dispatch, actions, nrOfStartedProcesses, backend } = this.props;

    let dataInputs =
      'inputCSVPath=ExportOngevalsData.csv;' +
      'metaCSVPath=metaDataCsv.json;' +
      'dataURL=http%3A%2F%2Fopendap.knmi.nl%2Fknmi%2Fthredds%2FdodsC%2FDATALAB%2Fhackathon%2FradarFullWholeData.nc;' +
      'dataVariables=image1_image_data;' +
      'limit=10';

    dispatch(actions.startWPSExecute(backend, 'wrangleProcess',
      dataInputs,
      nrOfStartedProcesses));
  };

  calculateClicked () {
    const { dispatch, actions, nrOfStartedProcesses, backend } = this.props;
    dispatch(actions.startWPSExecute(backend, 'binaryoperatorfornumbers_10sec',
      '[inputa=' + this.state.inputa + ';inputb=' + this.state.inputb + ';operator=' + this.state.dropDownValue + ';]', nrOfStartedProcesses));
  };

  handleChange (name, value) {
    console.log(name, value);
    this.setState({
      [name]: value
    });
    if (name === 'inputa') {
      let anomalyLayer = this.webMapJSInstance.getLayers()[0];
      anomalyLayer.wmsextensions({ colorscalerange:0 + ' ,' + parseInt(value) });
      console.log(this.webMapJSInstance.getLayers()[0]);
    }
  };

  debouncedHandleSliderChange (v) {
    this.handleSliderChange(v);
  }

  handleSliderChange (v) {
    this.setState({ currentValue:v });
    if (!this.webMapJSInstance || !this.webMapJSInstance) {
      console.log('No this.webMapJSInstance');
      return;
    }
    let anomalyLayer = this.webMapJSInstance.getLayers()[0];
    anomalyLayer.legendGraphic = '';
    anomalyLayer.wmsextensions({ colorscalerange:0 + ' ,' + (100 - parseInt(v / 1) * 1) });
    this.webMapJSInstance.draw();
  }

  renderAnomalyAgreement () {
    return (<div>
      <h1>Ensemble anomaly plots</h1>
      <Row>
        <Col>
          <Row>
            <Col>
              <div className='text'>
                Maps with percentage of models agreeing on the sign of (sub-)ensemble-mean anomalies
              </div>
            </Col>
          </Row>
          <Form>
            <FormGroup>
              <Label>Stippling (% of members agreeing):</Label>
              <Row>
                { /* <Col xs='2'><Input onChange={(event) => { this.handleChange('inputa', event.target.value); }} value={this.state.inputa} /></Col> */ }
                <Col xs='10'>
                  <ReactSlider
                    className={'horizontal-slider'}
                    defaultValue={this.state.currentValue}
                    onChange={(v) => { this.debouncedHandleSliderChange(v); }}
                  />
                </Col>
                <Col xs='2'>{this.state.currentValue} %</Col>
              </Row>
            </FormGroup>
          </Form>
        </Col>
        <Col xs='8'>
          <ADAGUCViewerComponent
            height={'70vh'}
            stacklayers
            wmsurl={config.backendHost + '/wms?DATASET=anomaly_agreement_stippling&'}
            parsedLayerCallback={
              (wmjsLayer, webMapJSInstance) => {
                // console.log('parsedLayerCallback', webMapJSInstance);
                this.webMapJSInstance = webMapJSInstance;
                if (!this.initialized) {
                  if (this.webMapJSInstance && this.webMapJSInstance.getLayers().length > 0) {
                    this.webMapJSInstance.getLayers()[0].zoomToLayer();
                    this.webMapJSInstance.zoomOut();
                    this.webMapJSInstance.zoomOut();
                    this.webMapJSInstance.draw();
                    this.initialized = true;
                  }
                }
              }
            }
          />
        </Col>
      </Row>
    </div>);
  }

  render () {
    return (
      <div className='MainViewport'>
        <Button style={{ float:'right' }} color='link' onClick={() => { this.props.router.push('/'); }}>(back)</Button>
        { this.renderAnomalyAgreement() }
      </div>);
  }
}

WPSWranglerDemo.propTypes = {
  backend: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
  actions: PropTypes.object.isRequired,
  router: PropTypes.object,
  nrOfStartedProcesses: PropTypes.number
};

export default withRouter(WPSWranglerDemo);
