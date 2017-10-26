// @flow
import React from 'react';

import { Colors, Blues } from '../../vars/colors';

import './NavBar.css';

type Props = {
  handleNav: Function,
  handleLogOut: Function
};

type State = {};

class NavBar extends React.Component<Props, State> {
  render() {
    const menuItems = [
      {
        label: 'Links',
        onclick: this.props.handleNav.bind(null, 'links')
      },
      {
        label: 'Forms',
        onclick: this.props.handleNav.bind(null, 'forms')
      }
    ];
    const navStyles = {
      nav: {
        backgroundColor: Blues.black
      },
      li: {
        color: Colors.lightShade
      },
      logout: {
        li: {
          color: Colors.mainBrand
        }
      }
    };
    return (
      <nav className="NavBar" style={navStyles.nav}>
        <ul className="NavBar__list--right">
          <li
            style={navStyles.logout.li}
            className="NavBar__item"
            onClick={this.props.handleLogOut}>
            Log Out
          </li>
        </ul>
        <ul className="NavBar__list NavBar__list--left">
          {menuItems.map(item => (
            <li
              style={navStyles.li}
              className="NavBar__item"
              onClick={item.onclick}>
              {item.label}
            </li>
          ))}
        </ul>
      </nav>
    );
  }
}

export default NavBar;
