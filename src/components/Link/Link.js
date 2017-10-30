// @flow
import React from 'react';

import './Link.css';

import type { LinkItem } from '../../types/link.item.type';

type Props = LinkItem & {
  handleDelete: Function,
  styles?: any
};

type State = {};

class Link extends React.Component<Props, State> {
  getStyles = (type: string) => {
    if (!this.props.styles) {
      return {};
    }
    return this.props.styles[type] ? this.props.styles[type] : {};
  };
  render() {
    const imgStyle = {
      backgroundImage: 'url(http://placecage.com/600/600)',
      backgroundColor: '#000'
    };
    return (
      <div className="Link" style={this.getStyles('parent')}>
        <div
          className="Link__delete"
          onClick={this.props.handleDelete.bind(
            null,
            this.props.id,
            this.props.categories
          )}>
          ⊗
        </div>
        <a
          href={this.props.link}
          style={this.getStyles('anchor')}
          target="_blank"
          rel="noopener noreferrer"
          className="Link__anchor">
          <div className="Link__body" style={this.getStyles('body')}>
            <figure className="Link__figure">
              <div className="Link__img-wrap">
                <div className="Link__img" style={imgStyle} />
              </div>
              <figcaption
                className="Link__title"
                style={this.getStyles('header')}>
                {this.props.title}
              </figcaption>
            </figure>
            <p className="Link__text" style={this.getStyles('text')}>
              {this.props.description}
            </p>
          </div>
        </a>
      </div>
    );
  }
}

export default Link;
