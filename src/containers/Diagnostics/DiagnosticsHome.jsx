
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { Provider } from 'react-redux';
import { getConfig } from '../../getConfig';
let config = getConfig();

import { UncontrolledAlert, Badge, Container, Row, Col, Card, CardLink, Button, CardImg, CardTitle, CardText, CardDeck, CardSubtitle, CardBody, CardGroup } from 'reactstrap';
import Icon from 'react-fa';

var $RefParser = require('json-schema-ref-parser');
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
    this.getTags = this.getTags.bind(this);
    this.getCard = this.getCard.bind(this);
    this.clickEvent = this.clickEvent.bind(this);
  }


  switchOverview() {
    this.setState({ overview: !this.state.overview });
  }

  clickEvent(item) {
    this.setState({ selectedPageYaml: item.info_file, selectedPageId: item.id });
    this.context.router.push('/diagnostics/' + item.name);
  }


  getTags(item) {
    var tagList = [];
    for (var key in item.tags) {
      if (item.tags.hasOwnProperty(key)) {
          tagList.push(item.tags[key]);
      }
    }

    var tagBadges = tagList.map(function(name){
       return <Badge key={name} style={{ fontSize: '15px', marginLeft: '10px', marginTop: '10px', backgroundColor: '#921A36'}} color="success">{name}</Badge>
    })

    return <div style={{ }}> {tagBadges} </div>
  }

  getCard(item) {

    var tagList = this.getTags(item);

    return (
      <div key={item.id} className='diagCard' >

          <Card key={item.id}
            onClick={() => this.clickEvent(item)}
            body className='text-left' outline color='primary'
            style={{ backgroundColor: '#ffffff', borderColor: '#921A36', borderWidth: '2px', marginBottom: '30px', overflowX: 'auto' }}
          >

            <CardBody key={item.id}>
              <Row key={item.id}>
                <Col key={item.id}>
                  <CardBody>
                      <h4 style={{ fontSize: '25px', color:'#921A36', textAlign: 'center', marginTop: '25px' }}> {item.title} </h4>
                      <CardSubtitle style={{ marginTop: '20px' }}> {item.sub_title} </CardSubtitle>
                  </CardBody>

                  <CardText style = {{ }} > {item.info_text} </CardText>

                </Col>
                <Col>
                  <CardImg style ={{ marginLeft: '20%', width: '60%'}} src={item.image_file} />
                </Col>
              </Row>
              <Row>
                <div>
                  {tagList}
                </div>
              </Row>

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
  }

  componentDidUpdate() {
  }

  render() {
    var diagList = this.state.diagList;
    var diagOverviewList = [];
    var that = this;



    Object.keys(diagList).forEach(function (key, i) {
      diagOverviewList.push(that.getCard(diagList[key]));
    })

    var destinationPage = this.state.selectedPageYaml;

    if (this.props.params && diagList.length != 0) {
      if (diagList[that.props.params.diag]){
        destinationPage = diagList[that.props.params.diag].info_file;
        this.state.overview = false;
      }
    }

    // if (this.state.overview) {
      return (
        <div className='vspace2em'>
          <Container>
            <Row>
              <Col sm='12'>
                  {diagOverviewList}
              </Col>
            </Row>
          </Container>

        </div>
      )
  }
}

DiagnosticsHome.contextTypes = {
  router: PropTypes.object.isRequired
};
