// @flow
import React from 'react';

import './Link.css';

import { LinkItem } from '../../types/link.item.type';

type Props = LinkItem & {
	handleDelete: Function;
	styles?: any;
};

type State = {};

class Link extends React.Component<Props, State> {
	getStyles = (type: string) => {
		if (!this.props.styles) { return {}; }
		return this.props.styles[type] ? this.props.styles[type] : {};
	}
  render() {
    return (
    	<div className="Link" style={this.getStyles('parent')}>
    		<div className="Link__delete" onClick={this.props.handleDelete.bind(null, this.props.id, this.props.categories)}>X</div>
    		<a href={this.props.link} style={this.getStyles('anchor')} target="_blank" rel="noopener noreferrer" className="Link__anchor">
    			<div className="Link__body" style={this.getStyles('body')}>
    				<h3 className="Link__header" style={this.getStyles('header')}>{this.props.title}</h3>
    				<p className="Link__text" style={this.getStyles('text')}>
    					{ this.props.description }
    				</p>
    			</div>
    		</a>
    	</div>
      );
  }
}

export default Link;
