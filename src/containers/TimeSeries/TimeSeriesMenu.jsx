import React, { Component } from 'react';
import { Navbar, NavItem, Nav, NavLink } from 'reactstrap';
import PropTypes from 'prop-types';
import Icon from 'react-fa';

export default class TimeSeriesMenu extends Component {
  render () {
    const { location } = this.props;
    var { pathname } = location;

    return (
      <div className='TitleComponent'>
        <Navbar style={{ backgroundColor:'#941333', color:'white', height:'38px', textAlign: 'center' }} className='navbar-static-top'>
          <Nav>
            <NavItem>
              <NavLink href='#/timeseries/home' active={pathname === '/timeseries/home'} >
                Timeseries
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href='#/timeseries/correlations' active={pathname === '/timeseries/correlations'} >
                Correlations
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href='#/timeseries/indicesonareaaverages' active={pathname === '/timeseries/indicesonareaaverages'} >
                <Icon name='' />
                Indices on area averages
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href='#/timeseries/spatiotemporalanalyses' active={pathname === '/timeseries/spatiotemporalanalyses'} >
                <Icon name='' />
                Spatio temporal analyses
              </NavLink>
            </NavItem>
          </Nav>
        </Navbar>
      </div>);
  }
}

TimeSeriesMenu.propTypes = {
  location: PropTypes.object
};
