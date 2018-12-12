
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { getConfig } from '../../getConfig';
let config = getConfig();

import { UncontrolledAlert, Badge, Container, Row, Col, Card, CardLink, Button, CardImg, CardTitle, CardText, CardDeck, CardSubtitle, CardBody, CardGroup } from 'reactstrap';

var $RefParser = require('json-schema-ref-parser');
var _ = require('lodash');

export default class TPHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      diagList: [],
      overview: true,
      selectedPageYaml: '',
      selectedPageId: ''
    }
    this.getTags = this.getTags.bind(this);
    this.getCard = this.getCard.bind(this);
    this.clickEvent = this.clickEvent.bind(this);
  }


  switchOverview() {
    this.setState({ overview: !this.state.overview });
  }

  clickEvent(item) {
    this.setState({ selectedPageYaml: item.info_file, selectedPageId: item.id });
    this.context.router.push(item.page_link);
  }


  getTags(item) {
    var tagList = [];
    for (var key in item.tags) {
      if (item.tags.hasOwnProperty(key)) {
          tagList.push(item.tags[key]);
      }
    }

    var tagBadges = tagList.map(function(name){
       return <Badge key={name} style={{ fontSize: '15px', marginLeft: '10px', marginTop: '10px', backgroundColor: '#4899b1'}} color="success">{name}</Badge>
    })

    return <div style={{ }}> {tagBadges} </div>
  }

  getCard(item) {

    var tagList = this.getTags(item);

    return (
      <div key={item.id} className='diagCard' >

          <Card key={item.id}
            onClick={() => this.clickEvent(item)}
            body className='text-left tailoredProducts' outline color='primary'
            style={{ backgroundColor: '#ffffff', borderColor: '#4899b1 !important', borderWidth: '2px', marginBottom: '30px', overflowX: 'auto' }}
          >

            <CardBody key={item.id}>
              <Row key={item.id}>
                <Col key={item.id}>
                  <CardBody>
                      <h4 style={{ fontSize: '25px', color:'#4899b1', textAlign: 'center', marginTop: '25px' }}> {item.title} </h4>
                      <CardSubtitle style={{ marginTop: '20px' }}> {item.sub_title} </CardSubtitle>
                  </CardBody>

                  <CardText style = {{ }} > {item.info_text} </CardText>
                  <Row>
                    <div>
                      {tagList}
                    </div>
                  </Row>
                </Col>
                <Col style={{display:'inherit'}} >
                  <CardImg style = {{ marginLeft:'auto', marginRight:'auto', width: '350px', display:'block', minWidth:'350px'}} src={item.image_file} />
                </Col>
              </Row>            
            </CardBody>

          </Card>

      </div>
    );
  }

  componentDidMount() {
    var that = this;
    $RefParser.dereference('contents/tailoredproducts/index.yml')
      .then(data => {
        that.setState({ diagList: data.diagnostics });
      });
  }

  componentWillMount() {
    // console.log('TPHome:componentWillMount');
  }

  componentDidUpdate() {
    // console.log('TPHome:componentDidUpdate');
  }

  render() {
    var diagList = this.state.diagList;
    var diagOverviewList = [];
    var that = this;

    // console.log('Props')
    // console.log(that.props);
    // console.log(that.props.routeParams);
    // console.log(that.props.params);


    Object.keys(diagList).forEach(function (key, i) {
      diagOverviewList.push(that.getCard(diagList[key]));
    })

    var destinationPage = this.state.selectedPageYaml;
    // console.log(destinationPage);
    // console.log(this.state.selectedPageId);

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
                The tailored products are showcases of our diagnostics, targeted to specific user groups.
              </Col>
            </Row>
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

TPHome.contextTypes = {
  router: 
    PropTypes.object.isRequired
};
