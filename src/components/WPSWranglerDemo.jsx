
import React, { Component } from 'react';
import ADAGUCViewerComponent from '../components/ADAGUCViewerComponent';
import PropTypes from 'prop-types';
import { Button, Input, FormGroup, Form, Label,ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Row, Col, Progress, Card, CardBody, CardTitle, CardText } from 'reactstrap';
import ReactSlider from 'react-slider';
import { withRouter } from 'react-router'
import { debounce } from 'throttle-debounce';
import axios from 'axios';
import AdagucMapDraw from './ADAGUC/AdagucMapDraw.js';


const colorBar = [
  {
    min:2.0,
    max:10000,
    text: '2 or more',
    fillColor: '#A30000',
    textColor:'white'
  }, {
    min:1.5,
    max:2.0,
    text: '1.5 till 2.0',
    fillColor: '#E30000',
    textColor:'white'
  }, {
    min:1.0,
    max:1.5,
    text: '1.0 till 1.5',
    fillColor: '#FF1F1F',
    textColor:'white'
  },, {
    min:0.5,
    max:1.0,
    text: '0.5 till 1.0',
    fillColor: '#FF5C5C',
    textColor:'white'
  }, {
    min:0.25,
    max:0.5,
    text: '0.25 till 0.5',
    fillColor: '#F99',
    textColor:'white'
  }, {
    min:-0.25,
    max:0.25,
    text: '-0.25 till 0.25',
    fillColor: '#FFF',
    textColor:'black'
  }, {
    min: -0.5,
    max: -0.25,
    text: '-0.25 till -0.5',
    fillColor: '#99D3FF',
    textColor:'white'
  }, {
    min: -1.0,
    max: -0.5,
    text: '-0.5 till -1.0',
    fillColor: '#5CB8FF',
    textColor:'white'
  }, {
    min: -1.5,
    max: -1.0,
    text: '-1.0 till -1.5',
    fillColor: '#1F9EFF',
    textColor:'white'
  },, {
    min: -2.0,
    max: -1.5,
    text: '-1.5 till -2.0',
    fillColor: '#007FE0',
    textColor:'white'
  }, {
    min: -100000,
    max: -2,
    text: '-2 or more',
    fillColor: '#005CA3',
    textColor:'white'
  },
];

class ActuariesPage extends Component {

constructor(props) {
  super(props);

  this.handleSliderChange = this.handleSliderChange.bind(this);
  this.debouncedHandleSliderChange = debounce(25, this.debouncedHandleSliderChange);
  this.extractValuesFromCSV = this.extractValuesFromCSV.bind(this);
  this.hoverFeatureCallback = this.hoverFeatureCallback.bind(this);
  let csvJSON = (csv) => {
    var lines=csv.split('\n');
    var result = [];
    var headers=lines[0].split(';');
    for(var i=1;i<lines.length;i++){
      var obj = {};
      var currentline=lines[i].split(';');
      for(var j=0;j<headers.length;j++){
        obj[headers[j]] = currentline[j];
      }
      result.push(obj);
    }
    return result;
  }
  let fetchGeoJSON = () => {

    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        //url: 'geodata/NUTS_2010_L0.geojson',
        url: 'geodata/eu-countries.geo.json',
        withCredentials: true,
        responseType: 'json'
      }).then(src => {
        if (src.data) {
          let geojson = src.data;
          for (let featureIndex = 0; featureIndex < geojson.features.length; featureIndex++) {
            const feature = geojson.features[featureIndex];
            const featureProps = feature.properties;
            if (featureProps.iso_a2 === 'NL' || featureProps.NUTS_ID === 'NL') {
              featureProps.fill = '#FF0000';
            }
          };
          this.setState({ geojson: src.data });
          if (this.state.wmjsregistry && this.state.wmjsregistry.first) {
            this.state.wmjsregistry.first.setProjection(
              {srs:'EPSG:32661' ,bbox:[422133.0051161968,-4614524.365473892,4714402.927897792,-1179461.5805027087]
            });
            this.state.wmjsregistry.first.draw();
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
        //

        // let newGeoJson = cloneDeep(this.props.drawProperties.adagucMapDraw.geojson);
        // newGeoJson.features[destinationFeatureNr].geometry = cloneDeep(src.data.features[0].geometry);
        // dispatch(drawActions.setGeoJSON(newGeoJson));

      }).catch(error => {
        reject(error);
      });
    });
  }
  this.state = {
      dropdownOpen: false,
      dropDownValue: 'add',
      inputa: 10,
      inputb: 20,
      currentValue: 1960,
      changeValue: 1960,
      step: 1,
      min: 1960,
      max:1991,

    };

    fetchGeoJSON();
}

extractValuesFromCSV() {
  this.csvData.map((csvItem) => {
  if (csvItem.time === this.state.currentValue+'-01-01T00:00:00') {
    this.geojson.features.map((feature) => {
      const featureProps = feature.properties;
      //featureProps['fill-opacity'] = 0.1;

      if (featureProps.iso_a2 === csvItem.id || featureProps.NUTS_ID === csvItem.id) {
        let value = parseFloat(csvItem.mean) +4.0;
        featureProps['fill-opacity'] = 1;
        featureProps['stroke-width'] = 1;
        // featureProps['text'] = value;// Math.round((parseFloat(value)*100.)/100.);
        featureProps['value'] = value
        featureProps.fill = '#888';
        featureProps['fill-opacity'] = 0.5;
        featureProps['stroke-width'] = 0.2;
        colorBar.map((colorItem)=>{
          if (value>=colorItem.min && value<colorItem.max) {
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
this.state.wmjsregistry.first.draw();
}

debouncedHandleSliderChange (v) {
  this.handleSliderChange(v);
}

handleSliderChange (v) {
  this.setState({currentValue:v});
  this.extractValuesFromCSV();
}

hoverFeatureCallback (featureIndex) {
  console.log(this.geojson.features[featureIndex].properties.value);
  this.setState({hoveredValue:this.geojson.features[featureIndex].properties.value});

}

render () {
  console.log(this.wmjsregistry);
     return (<div>
      <h1>Actuaries index</h1>
        <Row>
          <Col>
            { /*<Row>
              <Col>
                <div className='text'>
                  Maps with percentage of models agreeing on the sign of (sub-)ensemble-mean anomalies
                </div>
              </Col>
            </Row> */ }
            <Form>
              <FormGroup>
                <Label>Year:</Label>
                <Row>
                  { /* <Col xs='2'><Input onChange={(event) => { this.handleChange('inputa', event.target.value); }} value={this.state.inputa} /></Col> */ }


                  <Col xs='10'>
                    <ReactSlider className={'horizontal-slider'} min={this.state.min} max={this.state.max} defaultValue={this.state.currentValue} onChange={(v) =>{this.debouncedHandleSliderChange(v);}} />
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
                    colorBar.map((item) => { return (<div style={{
                      background:item.fillColor,
                      color: item.textColor,
                      padding:'10px',
                      border: this.state.hoveredValue >= item.min && this.state.hoveredValue < item.max ? '2px solid black' : '2px solid' + item.fillColor
                    }} >{item.text}</div>)})
                  }
                </CardText>
              </CardBody>
            </Card>
          </Col>
          <Col xs='8'>
            <ADAGUCViewerComponent
              height={'70vh'}
              stacklayers={true}
              baselayers = {[]}
              controls={{ showprojectionbutton: true }}

              // wmsurl={config.backendHost + '/wms?DATASET=anomaly_agreement_stippling&'}
              parsedLayerCallback={
                (wmjsregistry) => {
                  if (!this.state.initialized) {
                    console.log(wmjsregistry);
                    this.setState({wmjsregistry:wmjsregistry, initialized: true})
                    // this.state.wmjsregistry.getLayers()[0].zoomToLayer();
                  }
                }
              }
            />
            { this.state.initialized ?
            <AdagucMapDraw
              geojson={this.state.geojson}
              webmapjs={this.state.wmjsregistry.first}
              dispatch={this.props.dispatch}
              actions={this.props.actions}
              hoverFeatureCallback={this.hoverFeatureCallback}
            /> : null }
          </Col>
        </Row>
      </div>);
  }
};


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


  renderAnomalyAgreement () {
    return (<div>
      <h1>Ensemble anomaly plots</h1>
        <Row>
          <Col>
            { /*<Row>
              <Col>
                <div className='text'>
                  Maps with percentage of models agreeing on the sign of (sub-)ensemble-mean anomalies
                </div>
              </Col>
            </Row> */ }
            <Form>
              <FormGroup>
                <Label>Stippling (% of members agreeing):</Label>
                <Row>
                  { /* <Col xs='2'><Input onChange={(event) => { this.handleChange('inputa', event.target.value); }} value={this.state.inputa} /></Col> */ }


                  <Col xs='10'>
                    <ReactSlider className={'horizontal-slider'} defaultValue={this.state.currentValue} onChange={(v) =>{this.debouncedHandleSliderChange(v);}} />
                  </Col>
                  <Col xs='2'>{this.state.currentValue} %</Col>
                </Row>
              </FormGroup>
            </Form>
          </Col>
          <Col xs='8'>
            <ADAGUCViewerComponent
              height={'70vh'}
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
          </Col>
        </Row>
      </div>);
  }


  render () {
    const { nrOfStartedProcesses, runningProcesses, nrOfFailedProcesses, nrOfCompletedProcesses } = this.props;
    return (
      <div className='MainViewport'>
        <Button style={{float:'right'}} color='link' onClick={() => {this.props.router.push('/');} }>(back)</Button>
        { /* this.renderAnomalyAgreement() */ }
        <ActuariesPage/>
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
