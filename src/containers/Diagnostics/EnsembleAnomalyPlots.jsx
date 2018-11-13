
import React, { PureComponent } from 'react';
import ADAGUCViewerComponent from '../../components/ADAGUCViewerComponent';
import PropTypes from 'prop-types';
import { Button, FormGroup, Form, Label, Row, Col } from 'reactstrap';
import ReactSlider from 'react-slider';
import { withRouter } from 'react-router';
import { debounce } from 'throttle-debounce';

class WPSWranglerDemo extends PureComponent {
  constructor (props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      showSlider: this.props.showSlider ,
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
    // console.log("map_data:", this.props.map_data);
    // console.log("slider:", this.state.showSlider);
    // var data_path = config.backendHost + '/wms?DATASET=' + this.props.map_data + '&';

    return (<div>
      <h2>Ensemble anomaly plots</h2>
      <Row>
      {this.state.showSlider ?
        <Col>
          <Row>
            <div>
              Maps with percentage of models agreeing on the sign of (sub-)ensemble-mean anomalies
            </div>
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
         : ''}
        <Col xs='12'>
          <ADAGUCViewerComponent
            height={'50vh'}
            stacklayers
            wmsurl={this.props.map_data}
            parsedLayerCallback={
              (wmjsLayer, webMapJSInstance) => {
                this.webMapJSInstance = webMapJSInstance;
                if (!this.initialized) {
                  if (this.webMapJSInstance && this.webMapJSInstance.getLayers().length > 0) {
                    console.log('parsedLayerCallback', this.webMapJSInstance.getLayers().length);
                    this.webMapJSInstance.getLayers()[0].zoomToLayer();
                    // this.webMapJSInstance.zoomOut();
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
      <div className='text'>
        { this.renderAnomalyAgreement() }
      </div>);
  }
}

WPSWranglerDemo.propTypes = {
  map_data: PropTypes.string.isRequired,
  showSlider: PropTypes.bool
};

export default withRouter(WPSWranglerDemo);
