import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Form, Label, Row, Col, Card, CardBody, CardTitle, CardText } from 'reactstrap';
import ReactSlider from 'react-slider';
import { withRouter } from 'react-router';
import { debounce } from 'throttle-debounce';
import axios from 'axios';
import ADAGUCViewerComponent from '../../components/ADAGUCViewerComponent';
import AdagucMapDraw from '../../components/ADAGUC/AdagucMapDraw.js';

const colorBar = [{
  min: 2.0,
  max:10000,
  text:'2 or more',
  fillColor:'#A30000',
  textColor:'white'
}, {
  min:1.5,
  max:2.0,
  text: '1.5 till 2.0',
  fillColor:'#E30000',
  textColor:'white'
}, {
  min:1.0,
  max:1.5,
  text:'1.0 till 1.5',
  fillColor:'#FF1F1F',
  textColor:'white'
}, {
  min:0.5,
  max:1.0,
  text:'0.5 till 1.0',
  fillColor:'#FF5C5C',
  textColor:'white'
}, {
  min:0.25,
  max:0.5,
  text:'0.25 till 0.5',
  fillColor:'#F99',
  textColor:'white'
}, {
  min:-0.25,
  max:0.25,
  text:'-0.25 till 0.25',
  fillColor:'#FFF',
  textColor:'black'
}, {
  min:-0.5,
  max:-0.25,
  text:'-0.25 till -0.5',
  fillColor:'#99D3FF',
  textColor:'white'
}, {
  min:-1.0,
  max:-0.5,
  text:'-0.5 till -1.0',
  fillColor:'#5CB8FF',
  textColor:'white'
}, {
  min: -1.5,
  max: -1.0,
  text: '-1.0 till -1.5',
  fillColor: '#1F9EFF',
  textColor:'white'
}, {
  min:-2.0,
  max:-1.5,
  text:'-1.5 till -2.0',
  fillColor: '#007FE0',
  textColor:'white'
}, {
  min:-100000,
  max:-2,
  text:'-2 or more',
  fillColor: '#005CA3',
  textColor:'white'
}];

class ActuariesPage extends Component {
  constructor (props) {
    super(props);
    this.handleSliderChange = this.handleSliderChange.bind(this);
    this.debouncedHandleSliderChange = debounce(25, this.debouncedHandleSliderChange);
    this.extractValuesFromCSV = this.extractValuesFromCSV.bind(this);
    this.hoverFeatureCallback = this.hoverFeatureCallback.bind(this);
    let csvJSON = (csv) => {
      var lines = csv.split('\n');
      var result = [];
      var headers = lines[0].split(';');
      for (var i = 1; i < lines.length; i++) {
        var obj = {};
        var currentline = lines[i].split(';');
        for (var j = 0; j < headers.length; j++) {
          obj[headers[j]] = currentline[j];
        }
        result.push(obj);
      }
      return result;
    };
    let fetchGeoJSON = () => {
      return new Promise((resolve, reject) => {
        axios({
          method: 'get',
          url: 'geodata/eu-countries.geo.json',
          withCredentials: true,
          responseType: 'json'
        }).then(src => {
          if (src.data) {
            let geojson = src.data;
            for (let featureIndex = 0; featureIndex < geojson.features.length; featureIndex++) {
              const feature = geojson.features[featureIndex];
              const featureProps = feature.properties;
              // if (featureProps.iso_a2 === 'NL' || featureProps.NUTS_ID === 'NL') {
              //   featureProps.fill = '#FF0000';
              // }
            };
            this.setState({ geojson: src.data });
            if (this.state.webMapJSInstance && this.state.webMapJSInstance) {
              this.state.webMapJSInstance.setProjection({ srs:'EPSG:32661', bbox:[422133.0051161968, -4614524.365473892, 4714402.927897792, -1179461.5805027087] });
              this.state.webMapJSInstance.draw();
            }
            axios({
              method: 'get',
              url: 'actuaries/c3s-magic-actuaries-countriesextract.csv',
              withCredentials: true,
              responseType: 'csv'
            }).then(src => {
              if (src.data) {
                let csvData = csvJSON(src.data);

                geojson.features.map((feature) => {
                  const featureProps = feature.properties;
                  featureProps['fill-opacity'] = 0.0;
                  featureProps['stroke-width'] = 0.1;
                });
                this.geojson = geojson;
                this.csvData = csvData;
                this.extractValuesFromCSV();
              }
              resolve('Fetched FIR');
            });
          }
        }).catch(error => {
          reject(error);
        });
      });
    };

    this.state = {
      dropdownOpen: false,
      dropDownValue: 'add',
      inputa: 10,
      inputb: 20,
      currentValue: 1960,
      changeValue: 1960,
      step: 1,
      min: 1960,
      max:1991
    };

    fetchGeoJSON();
  }

  extractValuesFromCSV () {
    this.csvData.map((csvItem) => {
      if (csvItem.time === this.state.currentValue + '-01-01T00:00:00') {
        this.geojson.features.map((feature) => {
          const featureProps = feature.properties;
          if (featureProps.iso_a2 === csvItem.id || featureProps.NUTS_ID === csvItem.id) {
            let value = parseFloat(csvItem.mean) + 4.0;
            featureProps['fill-opacity'] = 1;
            featureProps['stroke-width'] = 1;
            // featureProps['text'] = value;// Math.round((parseFloat(value)*100.)/100.);
            featureProps['value'] = value;
            featureProps.fill = '#888';
            featureProps['fill-opacity'] = 0.5;
            featureProps['stroke-width'] = 0.2;
            colorBar.map((colorItem) => {
              if (value >= colorItem.min && value < colorItem.max) {
                featureProps['fill-opacity'] = 1;
                featureProps['stroke-width'] = 1;
                featureProps.fill = colorItem.fillColor;
              }
            });
          }
        });
      }
    });
    this.setState({ geojson: this.geojson });
    this.state.webMapJSInstance.draw();
  }

  debouncedHandleSliderChange (v) {
    this.handleSliderChange(v);
  }

  handleSliderChange (v) {
    this.setState({ currentValue:v });
    this.extractValuesFromCSV();
  }

  hoverFeatureCallback (featureIndex) {
    if (this.geojson && featureIndex >= 0 && this.geojson.features[featureIndex] && this.geojson.features[featureIndex]) {
      this.setState({ hoveredValue:this.geojson.features[featureIndex].properties.value });
    }
  }

  render () {
    return (<div className='MainViewport'>
      <h1>Actuaries index</h1>
      <Row>
        <div className='text' style={{ paddingBottom:'15px' }}>
        The changing risks between the recent past and the future are of great interest to the insurance industry
        because even slight changes in climate characteristics can translate into large impacts on risk distribution/management and expected losses.
        Comprehensive risk indices such as the ACRI, which integrates changes in frequency and magnitude of key climate indicators and elements of hazard,
         exposure and vulnerability, are crucial for decision making processes.
        </div>
      </Row>
      <Row>
        <Col x>
          <Form>
            <FormGroup>
              <Row>
                <Col xs='1'>
                  <Label>Year: </Label>
                </Col>
                <Col xs='9'>
                  <ReactSlider
                    className={'horizontal-slider'}
                    min={this.state.min}
                    max={this.state.max}
                    defaultValue={this.state.currentValue}
                    onChange={(v) => { this.debouncedHandleSliderChange(v); }}
                  />
                </Col>
                <Col xs='2'>{this.state.currentValue}</Col>
              </Row>
            </FormGroup>
          </Form>
          <Card>
            <CardBody>
              <CardTitle>Standard deviations:</CardTitle>
              <CardText>
                {
                  colorBar.map((item, i) => {
                    return (<div key={i} style={{
                      background:item.fillColor,
                      color: item.textColor,
                      padding:'6px 8px 6px 8px',
                      textAlign:'center',
                      margin: '0px 12px 0px 12px',
                      border: this.state.hoveredValue >= item.min && this.state.hoveredValue < item.max ? '2px solid black' : '2px solid' + item.fillColor
                    }} >{item.text}</div>);
                  })
                }
              </CardText>
            </CardBody>
          </Card>
        </Col>
        <Col xs='9'>
          <ADAGUCViewerComponent
            height={'60vh'}
            stacklayers
            baselayers={[]}
            controls={{ showprojectionbutton: false }}
            webMapJSInitializedCallback={
              (webMapJSInstance) => {
                webMapJSInstance.enableInlineGetFeatureInfo(false);
                if (!this.state.initialized) {
                  this.setState({ webMapJSInstance:webMapJSInstance, initialized: true });
                  // this.state.webMapJSInstance.getLayers()[0].zoomToLayer();
                }
              }
            }
          />
          { this.state.initialized ? <AdagucMapDraw
            geojson={this.state.geojson}
            webmapjs={this.state.webMapJSInstance}
            dispatch={this.props.dispatch}
            actions={this.props.actions}
            hoverFeatureCallback={this.hoverFeatureCallback}
          /> : null }
        </Col>
      </Row>
      <Row>
        <a href='#/tailoredproducts/insurance'>Checkout our video about actuaries.</a>
      </Row>
    </div>);
  }
};

ActuariesPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  actions: PropTypes.object.isRequired
};

export default withRouter(ActuariesPage);
