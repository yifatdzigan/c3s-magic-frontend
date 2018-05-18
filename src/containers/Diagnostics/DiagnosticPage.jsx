
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MarkdownFromFile from '../MarkdownFromFile';

import { YoutubeVideo, DiagnosticPlot } from './DiagnosticMedia';

import ADAGUCViewerComponent from '../../components/ADAGUCViewerComponent';

import { Row, Col, Button, Table } from 'reactstrap';
import Icon from 'react-fa';

//import Parser from 'html-react-parser';

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
    console.log("readYaml");
    console.log(this.props.yamlFile);
    var yamlPath = 'diagnosticsdata/' + this.props.yamlFile;
    console.log(yamlPath);
    this.setState({ yamlPath: yamlPath });
    console.log(this.state);

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


  renderPageElement(elementName) {
    if (this.state.readSuccess) {
      //      console.log(this.state);

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



  render() {
    const mapData = config.backendHost + 'wms?DATASET=' + 'anomaly_agreement_stippling' + '&';

    if (this.state.readSuccess) {
      return (
        <div className='MainViewport'>

          <div className='text vspace2em'>
            <h2>
              {this.renderPageElement('title')}
            </h2>
          </div>

          <Row>
            <Col xs="6">

              <div className='text vspace2em'>
                <h2>Patners</h2>
                {this.renderPageElement('partner')}
              </div>

              <div className='text vspace2em'>
                <h2>Description</h2>
                {this.renderPageElement('description_short')}
              </div>

              <div className='vspace2em'>
                <Button color="primary">Read more</Button>{' '}
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
                <Button color="primary">Download report <Icon name='file-pdf' /></Button>{' '}
                <Button color="primary">Download data <Icon name='file-archive' /></Button>{' '}
              </div>

              <div className='text vspace2em'>
                <h2>Settings</h2>
                {this.renderPageElement('settings')}
              </div>

              <div className='text vspace2em'>
                <h2>Contact</h2>
                {this.renderPageElement('contact')}
              </div>

            </Col>

            <Col xs="6">

              <div className="videoWrapper vspace2em">
                <YoutubeVideo video={this.renderPageElement('youtube')} autoplay="0" rel="0" modest="1" />
              </div>

              <div className='text vspace2em'>
                {mapData}
              </div>

              <div className='vspace2em'>
                <ADAGUCViewerComponent
                  height={'50vh'}
                  stacklayers={true}
                  wmsurl={mapData}
                  parsedLayerCallback={(wmjsregistry) => {
                    this.wmjsregistry = wmjsregistry;
                    if (!this.initialized) {
                      this.initialized = true;
                      this.wmjsregistry.anomaly.getLayers()[0].zoomToLayer();
                    }
                  }
                  }
                />
              </div>

              <div className='vspace2em'>
                <img width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=256%C3%97180&w=512&h=360" alt="Card image cap" />
              </div>

              <div className='vspace2em'>
                {this.renderPageElement('description_long')}
              </div>


              <div>

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
