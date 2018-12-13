import React, { Component } from 'react';
import { withRouter } from 'react-router';
import ADAGUCViewerComponent from '../../components/ADAGUCViewerComponent';
import { XAxis, YAxis, Tooltip, CartesianGrid, Line, LineChart } from 'recharts';
import { Row, Col } from 'reactstrap';
import RechartsComponent from '../../components/RechartsComponent.jsx';
import { composeUrlObjectFromURL, URLEncode } from 'adaguc-webmapjs';
import axios from 'axios';
class StormSurge extends Component {
  constructor (props) {
    super(props);
    this.state = {
      timeseriesData: []
    };
    this.webMapJSInstance = null;
    this.pointOnMapClicked = this.pointOnMapClicked.bind(this);
  }

  pointOnMapClicked (options) {
    if (!this.webMapJSInstance) {
      console.error('no wmjsinstance');
      return;
    }
    let currentOptions = {};
    currentOptions.x = options.x;
    currentOptions.y = options.y;
    currentOptions.set = true;
    let layers = this.webMapJSInstance.getLayers();
    for (let j = 0; j < layers.length; j++) {
      let gfiUrl = this.webMapJSInstance.getWMSGetFeatureInfoRequestURL(layers[j], options.x, options.y);  
      let urlObject = composeUrlObjectFromURL(gfiUrl);
      let GFIURL = urlObject.location + '?';   
      for (let key in urlObject.kvp) {
        let value = urlObject.kvp[key];
        if (key === 'info_format') value = 'application/json';
        if (key === 'time') value = '1000-01-01T00:00:00Z/3000-01-01T00:00:00Z';
        if (key === 'dim_member')value = '*';
        if (key === 'dim_ensemble_member')value = '*';
        GFIURL += (key + '=' + URLEncode(value)) + '&';
      }

      axios({
        method: 'get',
        url: GFIURL,
        withCredentials: true,
        responseType: 'json'
      }).then(src => {
        let newData = [];
        for (let key in src.data[0].data) {
          newData.push({ time:key, value: src.data[0].data[key] });
        }
        this.setState({ timeseriesDataFromAdaguc: src.data, timeseriesData: newData });
      }).catch((e) => {
        console.error(e);
      });
    }
  }

  getLineChart (that) {
    return (<LineChart width={that.state.rechartsWidth} height={that.state.rechartsHeight} data={that.props.data}>
      <XAxis dataKey='time' />
      <YAxis />
      <CartesianGrid stroke='#eee' strokeDasharray='5 5' />
      <Tooltip />
      <Line type='monotone' dataKey='value' stroke='#00F' />
    </LineChart>);
  };

  render () {
    const wmsurl = 'https://portal.c3s-magic.eu/backend/adagucserver?source=c3smagic%2FWP7-surge_estimator%2Fsurge_heights_EC-Earth_s01r14_20131201-20140131.nc&';
    return (<div className='MainViewport'>
      <Row>
        <h1>Surge height estimator</h1>
        Estimates surge levels along the coast of the North Sea from anomalies in mean sea level pressure and wind components.
        Please check the <a href='/#/diagnostics/surge_height'>surge height diagnostic</a>.
      </Row>
      <Row>
        <Col xs='8'>
          <ADAGUCViewerComponent
            height={'50vh'}
            layers={[]}
            wmsurl={wmsurl}
            controls={{
              showprojectionbutton: true,
              showlayerselector: true,
              showtimeselector: true,
              showstyleselector: true
            }}
            parsedLayerCallback={(layer, webMapJSInstance) => {
              layer.zoomToLayer();
              webMapJSInstance.draw();
              this.webMapJSInstance = webMapJSInstance;
              webMapJSInstance.addListener('mouseclicked', this.pointOnMapClicked, true);
            }}
          />
        </Col>
        <Col xs='4' style={{ height:'35vh' }} >
          <div style={{ height:'300px', display: 'block' }} />
          <RechartsComponent data={this.state.timeseriesData} type={'custom'} getCustom={this.getLineChart}/>
        </Col>
      </Row>
    </div>);
  }
};

export default withRouter(StormSurge);
