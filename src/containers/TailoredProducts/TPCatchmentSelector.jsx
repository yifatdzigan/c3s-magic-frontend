import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Form, Label, Row, Col, Card, CardBody, CardTitle, CardText } from 'reactstrap';
import ReactSlider from 'react-slider';
import { withRouter } from 'react-router';
import { debounce } from 'throttle-debounce';
import axios from 'axios';
import ADAGUCViewerComponent from '../../components/ADAGUCViewerComponent';
import AdagucMapDraw from '../../components/ADAGUC/AdagucMapDraw.js';
import { WMJSLayer } from 'adaguc-webmapjs';
import { XAxis, YAxis, Tooltip, CartesianGrid, LabelList, ScatterChart, Scatter, Cell } from 'recharts';


class TPCatchmentSelector extends Component {
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
        //ogr2ogr bundle.shp Thames.shp && ogr2ogr -append bundle.shp Elbe.shp && ogr2ogr -append bundle.shp MotalaStrom.shp && ogr2ogr -f GeoJSON catchments.geojson bundle.shp

        axios({
          method: 'get',
          url: 'tailoredproducts/catchments/catchments.geojson',
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
            geojson.features.map((feature) => {
                const featureProps = feature.properties;
                featureProps['fill-opacity'] = 1.0;
                featureProps['stroke-width'] = .8;
                featureProps['fill'] = '#0077be';
              });
            this.setState({ geojson: geojson });
            if (this.state.webMapJSInstance && this.state.webMapJSInstance) {
              this.state.webMapJSInstance.setProjection({ srs:'EPSG:3857', bbox:[-2713059.775840599,3550095.1576090357,6074940.224159404,10784052.816388614] });
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

                this.geojson = geojson;
                this.csvData = csvData;
                // this.extractValuesFromCSV();
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
    // this.extractValuesFromCSV();
  }

  hoverFeatureCallback (featureIndex) {
    if (this.geojson && featureIndex >= 0 && this.geojson.features[featureIndex] && this.geojson.features[featureIndex]) {
      this.setState({ hoveredValue:this.geojson.features[featureIndex].properties.value });
    }
  }

  render () {
    return (<div className='MainViewport'>
      <h1>Hydrology - catchment selector</h1>
      <Row>
        <div className='text' style={{ paddingBottom:'15px' }}>
        BLA BLA BLA ...
        </div>
      </Row>
      <Row>
        <Col xs='9'>
          <ADAGUCViewerComponent
            height={'60vh'}
            stacklayers
            baselayers={[new WMJSLayer({
                name: "Klokantech_Basic_NL_NoLabels",
                title: "World base layer Natural Earth ",
                type: "twms",
                enabled: true
              }),new WMJSLayer({
                service: config.backendHost + '/wms?dataset=baselayers&',
                name:'overlay',
                format:'image/png',
                title:'World country borders',
                enabled: false,
                keepOnTop:true
              })]}
            controls={{ showprojectionbutton: false, showdownloadbutton: false }}
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
        <Col xs='3'>
            test
        </Col>
      </Row>
     
    </div>);
  }
};

TPCatchmentSelector.propTypes = {
  dispatch: PropTypes.func.isRequired,
  actions: PropTypes.object.isRequired
};

export default withRouter(TPCatchmentSelector);
