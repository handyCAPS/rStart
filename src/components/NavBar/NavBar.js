// @flow
import React from 'react';

import { Colors, Blues } from '../../vars/colors';

import './NavBar.css';

type Props = {
  handleNav: Function
};

type State = {};

class NavBar extends React.Component<Props, State> {
  render() {
    const menuItems = [
      {
        label: 'Links',
        onclick: this.props.handleNav.bind(null, 'link')
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
      }
    };
    return (
      <nav className="NavBar" style={navStyles.nav}>
        <ul className="NavBar__list">
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
