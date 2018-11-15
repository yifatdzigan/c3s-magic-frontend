import React, { Component } from 'react';
import { Navbar, NavItem, Nav, NavLink } from 'reactstrap';
import PropTypes from 'prop-types';
import Icon from 'react-fa';

export default class CalculateMenu extends Component {
  render () {
    const { location } = this.props;
    var { pathname } = location;

    return (
      <div className='TitleComponent'>
        <Navbar style={{ backgroundColor:'#941333', color:'white', height:'38px', textAlign: 'center' }} className='navbar-static-top'>
          <Nav>
            <NavItem>
              <NavLink href='#/calculate' active={pathname === '/calculate'} >
                Calculate
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href='#/calculate/basket' active={pathname === '/calculate/basket'} >
                <Icon name='shopping-basket' /> Basket
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href='#/calculate/joblist' active={pathname === '/calculate/joblist'} >
                <Icon name='list' />
                Joblist
              </NavLink>
            </NavItem>
          </Nav>
        </Navbar>
      </div>);
  }
}

CalculateMenu.propTypes = {
  location: PropTypes.object
};
