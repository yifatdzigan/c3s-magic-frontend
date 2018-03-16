import React, { Component } from 'react';
import PropTypes from 'prop-types';
const WMJSTileRendererTileSettings = require('../../config/basemaps');
export default class ReactWebMapJS extends Component {
  constructor (props) {
    super(props);
    this.webMapJSCreated = false;
    this.resize = this.resize.bind(this);
    this._handleWindowResize = this._handleWindowResize.bind(this);
  }
  _handleWindowResize () {
    this.resize();
  }
  componentDidUpdate () {
    console.log('componentDidUpdate');
    console.log('layers', this.props.layers);
    if (this.props.layers && this.props.layers.length > 0 && this.props.layers[0]) {
      this.webMapJS.removeAllLayers();
      for (let j = 0;j < this.props.layers.length; j++) {
        this.webMapJS.addLayer(this.props.layers[j]);
      }
      if (this.props.wmjsRegistry) {
        this.props.wmjsRegistry(this.props.layers[0].name, this.webMapJS, true);
      }
    }
    this.webMapJS.draw();
  }
  componentDidMount () {
    console.log('componentDidMount');
    if (this.webMapJSCreated) {
      console.log('ok');
      return;
    }
    this.webMapJSCreated = true;
    this.webMapJS = new WMJSMap(this.refs.adagucwebmapjs);
    this.webMapJS.setBaseURL('./adagucwebmapjs/');
    this.webMapJS.setProjection({ srs:this.props.srs || 'EPSG:3857', bbox:this.props.bbox || [-19000000, -19000000, 19000000, 19000000] });
    this.webMapJS.setWMJSTileRendererTileSettings(WMJSTileRendererTileSettings);
    let baselayers = [
      // new WMJSLayer({ 'name': 'OSM', type: 'twms' }),
      new WMJSLayer({
        service: config.backendHost + '/wms?dataset=baselayers&',
        name:'baselayer',
        format:'image/png',
        title:'Basemap',
        enabled: true,
        keepOnTop:false
      }),
      new WMJSLayer({
        service: config.backendHost + '/wms?dataset=baselayers&',
        name:'overlay',
        format:'image/png',
        title:'World country borders',
        enabled: true,
        keepOnTop:true
      })
    ];
    console.log(baselayers);
    this.webMapJS.setBaseLayers(baselayers);


    if (this.props.listeners) {
      this.props.listeners.forEach((listener) => {
        this.webMapJS.addListener(listener.name, (data) => { listener.callbackfunction(this.webMapJS, data); }, listener.keep);
      });
    }
    this.resize();
    this.webMapJS.draw();

    window.addEventListener('resize', this._handleWindowResize);
  }

  componentWillUnMount () {
    window.removeEventListener('resize', this._handleWindowResize);
    if (this.props.wmjsRegistry) {
      this.props.wmjsRegistry(this.props.layers[0].name, this.webMapJS, false);
    }
  }
  resize () {
    const element = this.refs.adaguccontainer;
    if (element) {
      this.webMapJS.setSize(element.clientWidth, element.clientHeight);
    }
  }
  render () {
    if (this.container) {
      this.width = parseInt(this.container.clientWidth);
      this.height = parseInt(this.container.clientHeight);
    }

    // console.log(this.refs.adaguccontainer.clientWidth);
    // console.log('ReactWebMapJS render ', this.props);
    return (<div className='ReactWebMapJS' ref={(container) => { this.container = container; }}
      style={{ height:'100%', width:'100%', border:'none', display:'block', overflow:'hidden' }} >
      <div ref='adaguccontainer' style={{
        minWidth:'inherit',
        minHeight:'inherit',
        width: 'inherit',
        height: 'inherit',
        overflow: 'hidden',
        display:'block',
        border: 'none'
      }}>
        <div style={{ overflow: 'visible' }} >
          <div ref='adagucwebmapjs' />
        </div>
      </div>
    </div>);
  }
};
ReactWebMapJS.propTypes = {
  layers: PropTypes.array,
  listeners: PropTypes.array,
  bbox: PropTypes.object,
  wmjsRegistry: PropTypes.func,
  srs: PropTypes.string
};
