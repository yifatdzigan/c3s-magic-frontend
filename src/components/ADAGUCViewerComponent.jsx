import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getConfig } from '../getConfig';
import { debounce } from 'throttle-debounce';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Alert, Card, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import Icon from 'react-fa';
import ReactWebMapJS from './ReactWebMapJS';

let config = getConfig();
// console.log(config);

const mapTypeConfiguration = [
  {
    title: 'World Lat/Lon',
    bbox: [-180, -90, 180, 90],
    srs: 'EPSG:4326',
    baselayer:{ service:'http://geoservices.knmi.nl/cgi-bin/bgmaps.cgi?', name:'naturalearth2', type: 'wms' }
  }, {
    title: 'World Mollweide',
    bbox: [-18157572.744146045, -11212941.682924412, 18085661.018022258, 11419683.192411266],
    srs: 'EPSG:7399',
    baselayer:{ service:'http://geoservices.knmi.nl/cgi-bin/bgmaps.cgi?', name:'naturalearth2', type: 'wms' }
  },
  {
    title: 'World Robinson',
    bbox: [-17036744.451383516, -10711364.114367772, 16912038.081015453, 10488456.659686875],
    srs: 'EPSG:54030',
    baselayer:{ service:'http://geoservices.knmi.nl/cgi-bin/bgmaps.cgi?', name:'naturalearth2', type: 'wms' }
  }, {
    title: 'World Mercator',
    bbox: [-19000000, -19000000, 19000000, 19000000],
    srs: 'EPSG:3857',
    baselayer:{ service:'http://geoservices.knmi.nl/cgi-bin/bgmaps.cgi?', name:'naturalearth2', type: 'wms' }
  }, {
    title: 'Northern Hemisphere',
    bbox: [-5661541.927991125, -3634073.745615984, 5795287.923063262, 2679445.334384017],
    srs: 'EPSG:3411',
    baselayer:{ service:'http://geoservices.knmi.nl/cgi-bin/bgmaps.cgi?', name:'naturalearth2', type: 'wms' }
  }, {
    title: 'Southern Hemisphere',
    bbox: [-4589984.273212382, -2752857.546211313, 5425154.657417289, 2986705.2537886878],
    srs: 'EPSG:3412',
    baselayer:{ service:'http://geoservices.knmi.nl/cgi-bin/bgmaps.cgi?', name:'naturalearth2', type: 'wms' }
  }, {
    title: 'Europe North Pole',
    bbox: [-13000000,-13000000, 13000000, 13000000],
    srs: 'EPSG:3575',
    baselayer:{ service:'http://geoservices.knmi.nl/cgi-bin/bgmaps.cgi?', name:'naturalearth2', type: 'wms' }
  }, {
    title: 'Europe stereographic',
    bbox: [-2776118.977564746, -6499490.259201691, 9187990.785775745, 971675.53185069],
    srs: 'EPSG:32661',
    baselayer:{ service:'http://geoservices.knmi.nl/cgi-bin/bgmaps.cgi?', name:'naturalearth2', type: 'wms' }
  }, {
    title: 'North America',
    bbox: [-2015360.8716608454, -697107.5349683464, 9961718.159421016, 6782157.107682772],
    srs: 'EPSG:50001',
    baselayer:{ service:'http://geoservices.knmi.nl/cgi-bin/bgmaps.cgi?', name:'naturalearth2', type: 'wms' }
  }
];

export default class ADAGUCViewerComponent extends Component {
  constructor (props) {
    super(props);
    this.setProjection = this.setProjection.bind(this);
    this.getLayersForService = this.getLayersForService.bind(this);

    if (props.dapurl) {
      let WMSGetCapabiltiesURL = config.backendHost + '/wms?source=' + encodeURIComponent(props.dapurl);
      this.getLayersForService(WMSGetCapabiltiesURL, props.dapurl);
    } else if(props.wmsurl) {
      this.getLayersForService(props.wmsurl);
    } else {
      console.log('empty');
    }
    this.listeners = [];
    // console.log('wmjsRegistry = {}');
    this.wmjsRegistry = {};
    this.drawDebounced = debounce(1000, this.drawDebounced);
    this.updateBBOXDebounced = debounce(10, this.updateBBOXDebounced);
    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
      maprojection: 'Map projection',
      wmsLayers: [],
      srs : 'EPSG:3857',
      bbox: [-19000000, -19000000, 19000000, 19000000],
      title: null,
      error: null
    };
  }

  // componentWillReceiveProps (nextprops) {
  //   // this.getLayersForService(nextprops.dapurl);
  // };

  drawDebounced (webmapjs) {
    for (let key in this.wmjsRegistry) {
      let otherWebMapJS = this.wmjsRegistry[key];
      if (webmapjs !== otherWebMapJS) {
        otherWebMapJS.suspendEvent('onmaploadingcomplete');
        otherWebMapJS.draw();
        otherWebMapJS.resumeEvent('onmaploadingcomplete');
      }
    };
  };

  updateBBOXDebounced (webmapjs, bbox) {
    for (let key in this.wmjsRegistry) {
      let otherWebMapJS = this.wmjsRegistry[key];
      if (webmapjs !== otherWebMapJS) {
        otherWebMapJS.suspendEvent('onupdatebbox');
        otherWebMapJS.setBBOX(bbox);
        otherWebMapJS.resumeEvent('onupdatebbox');
      }
    };
  }

  // shouldComponentUpdate (nextProps, nextState) {
  //   console.log(nextProps, nextState);
  //   // You can access `this.props` and `this.state` here
  //   // This function should return a boolean, whether the component should re-render.
  //   return false;
  // }


  componentDidMount () {
    this.listeners = [
      { name:'onupdatebbox', callbackfunction: (webmapjs, bbox) => { this.updateBBOXDebounced(webmapjs, bbox); }, keep:true },
      { name: 'onmaploadingcomplete', callbackfunction: (webmapjs) => { this.drawDebounced(webmapjs); }, keep:true }
    ];
    mapTypeConfiguration.map((proj, index) => {
      if (proj.title === 'World Lat/Lon') {
        this.setProjection(proj);
      }
    });
  }

  getLayersForService (WMSGetCapabiltiesURL, dapurl) {
    // console.log('getLayersForService');
    this.setState({ wmsLayers:[], error:null, title:'Loading...' });
    // console.log(WMSGetCapabiltiesURL);

    // eslint-disable-next-line no-undef
    this.WMSServiceStore = WMJSgetServiceFromStore(WMSGetCapabiltiesURL);

    let httpCallbackWMSCapabilities = (_layerNames, serviceURL) => {
      if (_layerNames.error) {
        console.log('error');
        return;
      }
      // console.log(this.props);

      if (dapurl) {
        // console.log(this.props.dapurl);
        let baseName = (str) => {
          let base = str.substring(str.lastIndexOf('/') + 1);
          // if (base.lastIndexOf('.') !== -1) base = base.substring(0, base.lastIndexOf('.'));
          // console.log(base);
          return base;
        };

        this.setState({ title: baseName(dapurl) });
      }
      let wmsLayers = [];
      for (let j = 0; j < _layerNames.length; j++) {
        if (_layerNames[j].indexOf('baselayer') === -1 &&
            _layerNames[j].indexOf('overlay') === -1 &&
            _layerNames[j].indexOf('grid') === -1
            ) {
          // eslint-disable-next-line
          new WMJSLayer({
            service:WMSGetCapabiltiesURL,
            name:_layerNames[j],
            onReady: (callbackLayer) => {
              wmsLayers.push(callbackLayer);
              callbackLayer.onReady = null;
            }
          });
        }
      }
      // console.log('layerNames', wmsLayers);
      this.setState({ wmsLayers:wmsLayers });
    };
    this.WMSServiceStore.getCapabilities(
      () => {
        this.WMSServiceStore.getLayerNames(
          (data) => { httpCallbackWMSCapabilities(data, WMSGetCapabiltiesURL); },
          (error) => { console.log(error); });
      },
      (error) => {
        this.setState({ title:null, error: error });
        console.log(error);
      },
      true
    );
  }
  setProjection (p) {
    for (let key in this.wmjsRegistry) {
      let otherWebMapJS = this.wmjsRegistry[key];
      // console.log('Set projection', p, otherWebMapJS);
      otherWebMapJS.setProjection(p);
      otherWebMapJS.draw();
    }
    this.setState({
      'maprojection':p.title
    });
  }

  toggle () {
    // console.log('toggle', this.state.dropdownOpen);
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }
  // shouldComponentUpdate (nextProps, nextState) {
  //   // console.log(nextProps, nextState);
  //   // if (nextProps.wmsLayers && nextState.wmsLayers && nextProps.wmsLayers.length !== nextState.wmsLayers.length) return true;
  //   return false;
  // }

  render () {
    const { title, error } = this.state;
    // console.log(this.state.wmsLayers);
    // console.log('layer0', this.state.wmsLayers[0]);
    return (<div className={'ADAGUCViewerComponent'} style={{ width:this.props.width || '100%' }}>
      <CardBody style={{ padding:'0' }}>
        { this.props.showmetadata ? <div>
          { title ? (<CardTitle>NetCDF file: {this.state.title}</CardTitle>) : null }
          { error ? (<Alert color='danger'>{this.state.error}</Alert>) : null }
          <CardSubtitle>{this.WMSServiceStore.title}</CardSubtitle>
          <CardText>{this.WMSServiceStore.abstract}</CardText>
        </div>
        : null }

        { this.props.controls && this.props.controls.showprojectionbutton ? <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
          <DropdownToggle caret>
            <Icon name='globe' />&nbsp;{this.state.maprojection || 'Map projection'}
          </DropdownToggle>
          <DropdownMenu>
            {
              mapTypeConfiguration.map((proj, index) => {
                return (<DropdownItem key={index} onClick={(event) => {
                  mapTypeConfiguration.map((proj, index) => {
                    if (proj.title === event.target.innerText) {
                      this.setProjection(proj);
                    }
                  });
                }
                }>{proj.title}</DropdownItem>);
              })
            }
          </DropdownMenu>
        </Dropdown> : null
        }
        {
          (this.props.stacklayers !== true) ? this.state.wmsLayers.map((wmjslayer, index) => {
            // console.log(' this.state.wmsLayers',  this.state.wmsLayers);
            return (
              <Card style={{ padding:'0' }} body key={index} >
                <CardBody style={{ padding:'0' }} >
                  <CardTitle>Layer {wmjslayer.name} - {wmjslayer.title}</CardTitle>
                  <div style={{ width:this.props.width || '100%', height:this.props.height || '100%' }}>
                    <ReactWebMapJS
                      id={index}
                      key={wmjslayer.name}
                      layers={[wmjslayer]}
                      listeners={this.listeners}
                      wmjsRegistry={(id, wmjs, appendOrRemove) => {
                        if (appendOrRemove) this.wmjsRegistry[id] = wmjs; else delete this.wmjsRegistry[id];
                        if (this.props.parsedLayerCallback) this.props.parsedLayerCallback(this.wmjsRegistry); else wmjs.draw();
                      }}
                    />
                  </div>
                </CardBody>
              </Card>
            );
          }) : <Card body style={{ padding:'0' }} >
            <CardBody style={{ padding:'0' }}>
              <div style={{ width:this.props.width || '100%', height:this.props.height || '100%' }}>
                <ReactWebMapJS
                  baselayers={this.props.baselayers}
                  layers={this.state.wmsLayers}
                  listeners={this.listeners}
                  wmjsRegistry={(id, wmjs, appendOrRemove) => {
                    if (appendOrRemove) this.wmjsRegistry[id] = wmjs; else delete this.wmjsRegistry[id];
                    if (this.props.parsedLayerCallback) this.props.parsedLayerCallback(this.wmjsRegistry); else wmjs.draw();
                  }}
                />
              </div>
            </CardBody>
          </Card>
        }
      </CardBody>

    </div>);
  }
}

ADAGUCViewerComponent.propTypes = {
  dapurl: PropTypes.string,
  wmsurl: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  stacklayers: PropTypes.bool,
  showmetadata: PropTypes.bool,
  controls: PropTypes.object,
  parsedLayerCallback: PropTypes.func,
  baselayers: PropTypes.array
};
