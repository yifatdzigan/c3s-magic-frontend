
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { YoutubeVideo, DiagnosticPlot } from './DiagnosticMedia';

import WPSWranglerDemo from './EnsembleAnomalyPlots';
import ADAGUCViewerComponent from '../../components/ADAGUCViewerComponent';
import MarkdownFromFile from '../../containers/MarkdownFromFile';

import { Row, Col, Button, Table } from 'reactstrap';
import Icon from 'react-fa';

var $RefParser = require('json-schema-ref-parser');
var _ = require('lodash');

export default class DiagnosticPage extends Component {

  constructor() {
    super();
    this.state = {
      yamlData: '',
      readSuccess: false,
      yamlPath: '',
      staticPath: 'diagnosticsdata/'
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
    this.readYaml();
  }

  componentDidMount() {
  }

  getElementProperty(elementName, paramName) {
    var elem = this.state.yamlData[elementName];
    var paramVal = _.filter(elem, function (item) {
      if (typeof item[paramName] !== 'undefined') {
        return item[paramName];
      }
    });
    if (paramName === 'data_url') {
      return paramVal[0].data_url;
    }
    if (paramName === 'description_file') {
      paramVal = this.state.staticPath + paramVal[0].md_file;
      console.log(paramVal);
      return paramVal;
    }
    if (paramVal.length == 0) {
      return false;
    }
    return paramVal;
  }


  isEnabled(elementName) {
    if (this.state.yamlData && this.state.readSuccess) {
      var _element = this.state.yamlData[elementName];
      return Boolean(_element);
    }
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
      else if (elementName === "description_file") {
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
      else if (elementName === "enableEnsembleAnomalyPlots") {
        _element = this.state.yamlData[elementName];
        return Boolean(_element);
      }
      else if (elementName === "enableADAGUC") {
        _element = this.state.yamlData[elementName];
        return Boolean(_element);
      }
      else if (elementName === "references") {
        _element = this.state.yamlData[elementName];
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

  readMore(){
    var element = document.getElementById("additional");
    element.scrollIntoView();
  }

  toTop(){
    var element = document.getElementById("pagetop");
    element.scrollIntoView();
  }


  render() {

    if (this.state.readSuccess) {

      return (
        <div id="pagetop" className='MainViewport'>

          <div className='text vspace2em'>
            <h2>
              {this.renderPageElement('title')}
            </h2>
          </div>

          <Row>

            <Col xs="12" className='diagnosticsCol'>

              <div className='text'>
                <h2>Partners</h2>
                {this.renderPageElement('partner')}
              </div>

              <div className='text vspace2em'>
                <h2>Description</h2>
                {this.renderPageElement('description_short')}
                <div className='text vspace2em'>
                  <Button color="primary" onClick={this.readMore}><Icon name='' />&nbsp;Read more</Button>{' '}
                </div>
              </div>

              <div className='text vspace2em'>
                <h2>Authors</h2>
                {this.renderPageElement('authors')}
              </div>

              <div className='vspace2em'>
                {this.isEnabled('enableEnsembleAnomalyPlots') ?
                  [
                    <WPSWranglerDemo map_data={this.getElementProperty('enableEnsembleAnomalyPlots', 'data_url')}
                      showSlider={this.getElementProperty('enableEnsembleAnomalyPlots', 'map_slider')} />
                  ]
                  : null
                }

                {this.isEnabled('enableADAGUC') &&
                  <ADAGUCViewerComponent
                    height={'60vh'}
                    layers={[]}
                    controls={{
                      showprojectionbutton: this.getElementProperty('enableADAGUC', 'showprojectionbutton'),
                      showlayerselector: this.getElementProperty('enableADAGUC', 'showlayerselector'),
                      showtimeselector: this.getElementProperty('enableADAGUC', 'showtimeselector'),
                      showstyleselector: this.getElementProperty('enableADAGUC', 'showstyleselector')
                    }}
                    parsedLayerCallback={(layer, webMapJSInstance) => {
                      console.log('webMapJSInstance', webMapJSInstance);
                      layer.zoomToLayer();
                      webMapJSInstance.draw();
                    }}
                    wmsurl={this.getElementProperty('enableADAGUC', 'data_url')}
                  />
                }
              </div>

              {this.isEnabled('media') ?
                [
                    <div className='vspace2em'>
                        <img width="100%" src={this.renderPageElement('media')} />
                    </div>
                ]
                : null
              }

              <div className='text vspace2em'>
                <h2>Reference</h2>
                {this.renderPageElement('references')}
              </div>

              <div className='vspace2em'>
                <Button color="primary" onClick={this.downloadReport}><Icon name='file-pdf-o' />&nbsp;Download report</Button>{' '}
                <Button color="primary" onClick={this.downloadData}><Icon name='file-archive-o' />&nbsp;Download data</Button>{' '}
              </div>

              <div className='text vspace2em'>
                <h2>Settings</h2>
                {this.renderPageElement('settings')}
              </div>

              <div id="additional" className='text'>
                <h2>Additional information</h2>
              </div>

              <div className='vspace2em'>
                {this.isEnabled('description_file') ?
                  [
                    <MarkdownFromFile url={this.state.staticPath + this.state.yamlData['description_file']} />
                  ]
                  : null
                }
              </div>

              <div className='vspace2em'>
                {this.isEnabled('youtube') ?
                  [
                    <div className='vspace2em'>
                    <h2>Screencast</h2>
                    <YoutubeVideo video={this.renderPageElement('youtube')} autoplay="0" rel="0" modest="1" />
                    </div>
                  ]
                  : null
                }
              </div>

              <div className='text vspace2em'>
                <h2>Contact</h2>
                {this.renderPageElement('contact')}
                <Button color="primary" onClick={this.toTop}><Icon name='' />&nbsp;Go to the top of the page</Button>{' '}
              </div>

            </Col>

          </Row>
        </div>);
    }
    else {
      return (
        <div>
          <p> An error occured or this diagnostic pacge is not ready yet!</p>
          <p> Please contact the developers...</p>
        </div>
      );
    }

  }
}

DiagnosticPage.propTypes = {
  yamlFile: PropTypes.string
};
