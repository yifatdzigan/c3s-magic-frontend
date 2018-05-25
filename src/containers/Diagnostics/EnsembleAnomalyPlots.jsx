
import React, { Component } from 'react';
import ADAGUCViewerComponent from '../../components/ADAGUCViewerComponent';
import PropTypes from 'prop-types';
import { Button, FormGroup, Form, Label, Row, Col } from 'reactstrap';
import ReactSlider from 'react-slider';
import { withRouter } from 'react-router';
import { debounce } from 'throttle-debounce';

class WPSWranglerDemo extends Component {
  constructor (props) {
    super(props);
    this.toggle = this.toggle.bind(this);
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

  debouncedHandleSliderChange (v) {
    this.handleSliderChange(v);
  }

  handleSliderChange (v) {
    this.setState({ currentValue:v });
    if (!this.wmjsregistry || !this.wmjsregistry) {
      console.log('No this.wmjsregistry');
      return;
    }
    let anomalyLayer = this.wmjsregistry.getLayers()[0];
    anomalyLayer.legendGraphic = '';
    anomalyLayer.wmsextensions({ colorscalerange:0 + ' ,' + (100 - parseInt(v / 1) * 1) });
    this.wmjsregistry.draw();
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
              (wmjsregistry) => {
                console.log('parsedLayerCallback', wmjsregistry);
                this.wmjsregistry = wmjsregistry;
                if (!this.initialized) {
                  if (this.wmjsregistry && this.wmjsregistry.getLayers().length > 0) {
                    console.log('parsedLayerCallback', this.wmjsregistry.getLayers().length);
                    this.wmjsregistry.getLayers()[0].zoomToLayer();
                    this.wmjsregistry.zoomOut();
                    this.wmjsregistry.zoomOut();
                    this.wmjsregistry.draw();
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
  domain: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
  actions: PropTypes.object.isRequired,
  router: PropTypes.object,
  nrOfStartedProcesses: PropTypes.number
};

export default withRouter(WPSWranglerDemo);
