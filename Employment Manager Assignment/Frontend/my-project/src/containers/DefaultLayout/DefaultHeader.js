import React, { Component } from 'react';
import { DropdownToggle, Nav, NavItem, NavLink } from 'reactstrap';
import PropTypes from 'prop-types';

import { AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo_1 from '../../assets/img/brand/blueTac_1.png'
import logo_2 from '../../assets/img/brand/Bluetac_2.png'
import User from '../../assets/img/brand/user_2.webp';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {
  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ src: logo_1, width: 89, height: 25, alt: 'CoreUI Logo' }}
          minimized={{ src: logo_2, width: 30, height: 30, alt: 'CoreUI Logo' }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />

        <Nav className="d-md-down-none" navbar>
          <NavItem className="px-3">
            <NavLink href="/">Dashboard | Cases</NavLink>
          </NavItem>
        </Nav>

        <Nav className="ml-auto" navbar>
          <div>
            <div className="font-weight-bold user_name">jone@company.com</div>
          </div>
          <AppHeaderDropdown direction="down">
            <DropdownToggle nav>
              {/*<img src={'../../assets/img/avatars/6.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />*/}
              <img src={User} className="img-avatar"/>
            </DropdownToggle>
          </AppHeaderDropdown>
        </Nav>

      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
