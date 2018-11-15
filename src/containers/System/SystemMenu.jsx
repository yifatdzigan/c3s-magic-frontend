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
              <NavLink href='#/about' active={pathname === '/about'} >
                System
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href='#/about/provenance' active={pathname === '/about/provenance'} >
                Provenance
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href='#/about/data' active={pathname === '/about/data'} >
                <Icon name='' />
                Data used in this Portal
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href='#/about/adagucviewer' active={pathname === '/about/adagucviewer'} >
                <Icon name='' />
                Data Viewer
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href='#/about/interactivecharts' active={pathname === '/about/interactivecharts'} >
                <Icon name='' />
                Charts
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
