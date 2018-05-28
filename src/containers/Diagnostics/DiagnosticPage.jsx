
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { YoutubeVideo, DiagnosticPlot } from './DiagnosticMedia';

import WPSWranglerDemo from './EnsembleAnomalyPlots';
import ADAGUCViewerComponent from '../../components/ADAGUCViewerComponent';

import { Row, Col, Button, Table } from 'reactstrap';
import Icon from 'react-fa';

var $RefParser = require('json-schema-ref-parser');

export default class DiagnosticPage extends Component {

  constructor() {
    super();
    this.state = {
      yamlData: '',
      readSuccess: false,
      yamlPath: ''
    };
    this.readYaml = this.readYaml.bind(this);
  }

  readYaml() {
    var yamlPath = 'diagnosticsdata/' + this.props.yamlFile;
    this.setState({ yamlPath: yamlPath });
    var that = this;
    $RefParser.dereference(yamlPath)
      .then(data => {
        that.setState({ yamlData: data, readSuccess: true });
      });

  }

  componentWillMount() {
    console.log("componentWillMount");
    this.readYaml();
    console.log(this.state);
  }

  componentDidMount() {
    console.log("componentDidMount");
    console.log(this.state);
  }

  checkElementparameterBool(elementName, paramName) {
    var elem = this.state.yamlData[elementName];
    Object.keys(elem).forEach(function (key) {
      var sub_elem = elem[key];
      Object.keys(sub_elem).forEach(function (sub_key) {

        var sub_elem_key_val = sub_elem[sub_key];
        console.log(elem, sub_elem, sub_elem_key_val);

      });
    });
  }


  renderPageElement(elementName) {
    if (this.state.yamlData && this.state.readSuccess) {
      var _element = '';
      if (elementName === "partner") {
        _element = this.state.yamlData[elementName];
      }
      else if (elementName === "authors") {
        _element = '<ul class="list-unstyled">';
        this.state.yamlData[elementName].forEach(function (element) {
          _element += '<li>' + element + '</li>';
        });
        _element += '</ul>';
      }
      else if (elementName === "contact") {
        _element = '<ul class="list-unstyled">';
        this.state.yamlData[elementName].forEach(function (element) {
          _element += '<li>' + element + '</li>';
        });
        _element += '</ul>';
      }
      else if (elementName === "description_short") {
        _element = this.state.yamlData[elementName];
      }
      else if (elementName === "description_long") {
        _element = this.state.yamlData[elementName];
      }
      else if (elementName === "reference") {
        _element = this.state.yamlData[elementName];
      }
      else if (elementName === "settings") {
        _element = '<Table class="table table-bordered table-striped"> <thead> </thead> <tbody>';
        var elem = this.state.yamlData[elementName];
        Object.keys(elem).forEach(function (key) {
          var sub_elem = elem[key];
          Object.keys(sub_elem).forEach(function (sub_key) {
            _element += '</tr>';
            _element += '<th scope="row">' + sub_key + '</th>';
            _element += '<td>' + sub_elem[sub_key] + '</td>'
            _element += '</tr>';
          });
        });
        _element += '</tbody></Table>';
      }
      else if (elementName === "map_data") {
        _element = this.state.yamlData[elementName];
        return String(_element);
      }
      else if (elementName === "map_slider") {
        _element = this.state.yamlData[elementName];
        return Boolean(_element);
      }
      else if (elementName === "enableEnsembleAnomalyPlots") {
        _element = this.state.yamlData[elementName];
        return Boolean(_element);
      }
      else if (elementName === "enableADAGUC") {
        _element = this.state.yamlData[elementName];
        console.log(_element);
        return Boolean(_element);
      }
      else if (elementName === "media") {
        _element = this.state.yamlData[elementName];
        return _element;
      }
      else if (elementName === "title") {
        _element = this.state.yamlData[elementName];
        return _element;
      }
      else if (elementName === "youtube") {
        _element = this.state.yamlData[elementName];
        return _element;
      }
      else {
        console.warn("Could not find the key " + elementName + " in the configuration file!");
        _element = "No key was requested! Check the diagnostics settings.";
      }
      return (<div dangerouslySetInnerHTML={{ __html: _element }} />);
    }
  }


  downloadReport() {
    console.log('Download report...');
  }

  downloadData() {
    console.log('Download data...');
  }


  render() {
    //    this.checkElementparameterBool(enableADAGUC, projectionbutton);

    if (this.state.readSuccess) {
      return (
        <div className='MainViewport'>

          <div className='text vspace2em'>
            <h2>
              {this.renderPageElement('title')}
            </h2>
          </div>

          <Row>
            <Col xs="6" className='diagnosticsCol'>

              <div className='text vspace2em'>
                <h2>Partners</h2>
                {this.renderPageElement('partner')}
              </div>

              <div className='text vspace2em'>
                <h2>Description</h2>
                {this.renderPageElement('description_short')}
              </div>

              <div className='text vspace2em'>
                <h2>Authors</h2>
                {this.renderPageElement('authors')}
              </div>

              <div className='text vspace2em'>
                <h2>Reference</h2>
                {this.renderPageElement('reference')}
              </div>

              <div className='vspace2em'>
                <Button color="primary" onClick={this.downloadReport}><Icon name='file-pdf-o' />&nbsp;Download report</Button>{' '}
                <Button color="primary" onClick={this.downloadData}><Icon name='file-archive-o' />&nbsp;Download data</Button>{' '}
              </div>

              <div className='text vspace2em'>
                <h2>Settings</h2>
                {this.renderPageElement('settings')}
              </div>

              <div className='text vspace2em atBottom'>
                <h2>Contact</h2>
                {this.renderPageElement('contact')}
              </div>

            </Col>

            <Col xs="6" className='diagnosticsCol'>

              <div className='vspace2em'>
                {this.renderPageElement('youtube') ?
                  [
                    <h2>Youtube Video</h2>,
                    <YoutubeVideo video={this.renderPageElement('youtube')} autoplay="0" rel="0" modest="1" />
                  ]
                  : null
                }
              </div>

              <div className='vspace2em'>

                {this.renderPageElement('enableEnsembleAnomalyPlots') ?
                  [
                    <WPSWranglerDemo map_data={this.renderPageElement('map_data')}
                      showSlider={this.renderPageElement('map_slider')} />
                  ]
                  : null
                }

                {this.renderPageElement('enableADAGUC') &&
                  <ADAGUCViewerComponent
                    height={'60vh'}
                    layers={[]}
                    controls={{
                      showprojectionbutton: true,
                      showlayerselector: true,
                      showtimeselector: true,
                      showstyleselector: true
                    }}
                    parsedLayerCallback={(layer, webMapJSInstance) => {
                      console.log('webMapJSInstance', webMapJSInstance);
                      layer.zoomToLayer();
                      webMapJSInstance.draw();
                    }}
                    wmsurl={'https://portal.c3s-magic.eu/wms?DATASET=WP7_ISAC_rainfarm'}
                  />
                }

              </div>

              <div className='vspace2em'>
                <img width="100%" src={this.renderPageElement('media')} />
              </div>

              <div className='vspace2em'>
                {this.renderPageElement('description_long')}
              </div>

            </Col>

          </Row>
        </div>);
    }
    else {
      return (
        <div>
          <p> This diagnostic pacge is not ready yet!</p>
        </div>
      );
    }

  }
}

DiagnosticPage.propTypes = {
  yamlFile: PropTypes.string
};
