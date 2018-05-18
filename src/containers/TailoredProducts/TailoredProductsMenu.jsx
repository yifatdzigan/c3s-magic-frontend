import React, { Component } from 'react';
import { Navbar, NavItem, Nav, NavLink } from 'reactstrap';
import PropTypes from 'prop-types';
import Icon from 'react-fa';

export default class TailoredProductsMenu extends Component {
  render () {
    const { location } = this.props;
    var { pathname } = location;

    return (
      <div className='TitleComponent'>
        <Navbar style={{ backgroundColor:'#941333', color:'white', height:'38px', textAlign: 'center' }} className='navbar-static-top'>
          <Nav>
            <NavItem>
              <NavLink href='#/' active={pathname === '/'} >
                Insurance / Actuaries index
              </NavLink>
            </NavItem>

            { /* <NavItem>
              <NavLink href='#/tailoredproducts/home' active={pathname === '/tailoredproducts/home'} >
                Tailored products
              </NavLink>
            </NavItem> */ }
            { /* <NavItem>
              <NavLink href='#/tailoredproducts/coastalareas' active={pathname === '/tailoredproducts/coastalareas'} >
                Coastal areas
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href='#/tailoredproducts/energy' active={pathname === '/tailoredproducts/energy'} >
                <Icon name='' />
                Energy
              </NavLink>
            </NavItem> */ }
            { /* <NavItem>
              <NavLink href='#/tailoredproducts/insurance' active={pathname === '/tailoredproducts/insurance'} >
                <Icon name='' />
                Insurance
              </NavLink>
            </NavItem> */ }
            { /* <NavItem>
              <NavLink href='#/tailoredproducts/userconsultation' active={pathname === '/tailoredproducts/userconsultation'} >
                <Icon name='' />
                User consultation
              </NavLink>
            </NavItem> */ }
            <NavItem>
              <NavLink href='#/tailoredproducts/waterhydrology' active={pathname === '/tailoredproducts/waterhydrology'} >
                <Icon name='' />
                Water and hydrology
              </NavLink>
            </NavItem>
          </Nav>
        </Navbar>
      </div>);
  }
}

TailoredProductsMenu.propTypes = {
  location: PropTypes.object
};
