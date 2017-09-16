// @flow
import React from 'react';

import './Link.css';

type Props = {
	id: string;
	title: string;
	link: string;
	category: string;
	handleDelete: Function;
};

type State = {};

class Link extends React.Component<Props, State> {
  render() {
    return (
    	<div className="Link">
    		<div className="Link__delete" onClick={this.props.handleDelete.bind(null, this.props.id)}>X</div>
    		<a href={this.props.link} target="_blank" rel="noopener noreferrer" className="Link__anchor">
    			<div className="Link__body">
    				<h3 className="Link__header">{this.props.title}</h3>
    				<p className="Link__text">
    					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vitae, quibusdam. Consequatur quos suscipit tenetur numquam, ad iste consectetur repellendus architecto.
    				</p>
    			</div>
    		</a>
    	</div>
      );
  }
}

export default Link;
