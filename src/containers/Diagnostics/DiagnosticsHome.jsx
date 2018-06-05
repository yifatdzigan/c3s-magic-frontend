
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { Provider } from 'react-redux';
import { getConfig } from '../../getConfig';
let config = getConfig();

import { UncontrolledAlert, Container, Row, Col, Card, CardLink, Button, CardImg, CardTitle, CardText, CardDeck, CardSubtitle, CardBody, CardGroup } from 'reactstrap';
import Icon from 'react-fa';

import DiagnosticPage from './DiagnosticPage';

var $RefParser = require('json-schema-ref-parser');
import Grid from 'react-css-grid'
var _ = require('lodash');

export default class DiagnosticsHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      diagList: [],
      overview: true,
      selectedPageYaml: '',
      selectedPageId: ''
    }
    this.switchOverview = this.switchOverview.bind(this);
    this.getCard = this.getCard.bind(this);
    this.clickEvent = this.clickEvent.bind(this);
  }

  switchOverview() {
    this.setState({ overview: !this.state.overview });
  }

  clickEvent(yamlFile, fileId) {
    this.setState({ selectedPageYaml: yamlFile, selectedPageId: fileId });
    this.switchOverview();
    console.log(yamlFile);
    console.log(fileId);
  }

  getCard(item) {
    return (
      <div key={item.id} className="diagCard">

        <Card key={item.id} onClick={() => this.clickEvent(item.info_file, item.id)}
          body className="text-left" outline color="primary">

          <CardBody>
            <CardTitle> {item.title} </CardTitle>
            <CardSubtitle> {item.sub_title} </CardSubtitle>
          </CardBody>

          <CardImg width="100%" src={item.image_file} />

          <CardBody>
            <CardText> {item.info_text} </CardText>
          </CardBody>

        </Card>

      </div>
    );
  }

  componentDidMount() {
    var that = this;
    $RefParser.dereference('diagnosticsdata/index.yml')
      .then(data => {
        that.setState({ diagList: data.diagnostics });
      });
  }

  componentWillMount() {
    console.log('DiagnosticsHome:componentWillMount');
  }

  componentDidUpdate() {
    console.log('DiagnosticsHome:componentDidUpdate');
  }

  render() {
    var diagList = this.state.diagList;
    var tmpList = [];
    var that = this;
    Object.keys(diagList).forEach(function (key, i) {
      tmpList.push(that.getCard(diagList[key]));
    })

    var destinationPage = this.state.selectedPageYaml;
    console.log(destinationPage);

    if (this.props.params && diagList.length != 0) {
      // var that = this;
      // var result = _.find(diagList, function (item) {
      //   //return item.id == that.props.params.diag
      //   return item == that.props.params.diag;
      // });
      // console.log(result);
      console.log(diagList[that.props.params.diag]);
      // if (result.info_file) {
      //   destinationPage = result.info_file;
      //   this.state.overview = false;
      // }
      if (diagList[that.props.params.diag]){
        destinationPage = diagList[that.props.params.diag].info_file;
        this.state.overview = false;
      }

    }

    if (this.state.overview) {
      return (
        <div className='vspace2em'>
          <Container>
            <Row>

              <Col sm="12" md={{ size: 10, offset: 1 }}>
                <UncontrolledAlert color="info">
                  Click on a diagnostic to get more information!
                    </UncontrolledAlert>
              </Col>

              <Col sm="12" md={{ size: 10, offset: 1 }}>
                <Grid width={320} gap={40}>
                  {tmpList}
                </Grid>
              </Col>
            </Row>
          </Container>

        </div>
      )
    } else {

      return (
        <div className='vspace2em'>
          <Container>
            <Row>
              <Col sm="12" md={{ size: 12, offset: 0 }}>
                <Button color="success" onClick={this.switchOverview}> Back to the overview </Button>
                <DiagnosticPage yamlFile={destinationPage} />
              </Col>
            </Row>
          </Container>

        </div>
      );

    }
  }
}

