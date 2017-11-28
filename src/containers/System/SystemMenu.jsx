import React, { Component } from 'react';
import { Navbar, NavItem, Nav, NavLink } from 'reactstrap';
import PropTypes from 'prop-types';
import Icon from 'react-fa';

export default class SystemMenu extends Component {
  render () {
    const { location } = this.props;
    var { pathname } = location;

    return (
      <div className='TitleComponent'>
        <Navbar style={{ backgroundColor:'#941333', color:'white', height:'38px', textAlign: 'center' }} className='navbar-static-top'>
          <Nav>
            <NavItem>
              <NavLink href='#/system/home' active={pathname === '/system/home'} >
                System
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href='#/system/provenance' active={pathname === '/system/provenance'} >
                Provenance
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href='#/system/data' active={pathname === '/system/data'} >
                <Icon name='' />
                Data used in this Portal
              </NavLink>
            </NavItem>
          </Nav>
        </Navbar>
      </div>);
  }
}

SystemMenu.propTypes = {
  location: PropTypes.object
};
