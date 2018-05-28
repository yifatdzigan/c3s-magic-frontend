import React, { Component } from 'react';
import { Navbar, NavItem, Nav, NavLink } from 'reactstrap';
import PropTypes from 'prop-types';
import Icon from 'react-fa';

export default class DiagnosticsMenu extends Component {
  render () {
    const { location } = this.props;
    var { pathname } = location;

    return (
      <div className='TitleComponent'>
        <Navbar style={{ backgroundColor:'#941333', color:'white', height:'38px', textAlign: 'center' }} className='navbar-static-top'>
          <Nav>
            <NavItem>
              <NavLink href='#/metrics/home' active={pathname === '/metrics/home'} >Metrics</NavLink>
            </NavItem>
          </Nav>
        </Navbar>
      </div>);
  }
}

DiagnosticsMenu.propTypes = {
  location: PropTypes.object
};
