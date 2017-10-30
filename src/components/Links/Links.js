// @flow
import React from 'react';

import './Links.css';

import Link from '../Link/Link';

import type { LinkItem } from '../../types/link.item.type';

import { Colors } from '../../vars/colors';

type Props = {
  links: Array<LinkItem>,
  handleDelete: Function
};

type State = {};

class Links extends React.Component<Props, State> {
  render() {
    const linkStyles = {
      anchor: {
        color: Colors.lightShade
      },
      header: {
        color: Colors.lightShade
      },
      parent: {
        backgroundColor: Colors.darkAccent
      }
    };
    return (
      <div className="Links">
        {this.props.links.map((link, i) => (
          <Link
            key={i}
            styles={linkStyles}
            {...link}
            handleDelete={this.props.handleDelete}
          />
        ))}
      </div>
    );
  }
}

export default Links;
