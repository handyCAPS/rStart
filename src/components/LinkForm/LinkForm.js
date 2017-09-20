// @flow
import React from 'react';

import './LinkForm.css';

import Form from '../Form/Form';

import { InputOption } from '../../types/input.type';

type Props = {
	categories: Array<any>;
	handleFormSubmit: Function;
};

type State = {
	inputArray: Array<Input>;
};

class LinkForm extends React.Component<Props, State> {

	catsToOptionsArray: Function;

	constructor(props) {
		super(props);
		const inputArray = [
			{
				id: 'title',
				value: '',
				attributes: {
					required: true
				},
				errors: []
			},
			{
				id: 'link',
				value: '',
				attributes: {
					required: true
				},
				errors: []
			},
			{
				id: 'categories',
				label: 'category',
				type: 'select',
				children: props.categories,
				value: '',
				errors: []
			},
			{
				id: 'excludeFromBestOf',
				label: 'Exclude from bestof',
				type: 'checkbox',
				value: false,
				errors: []
			}
		];

		this.state = { inputArray };

	}

	catsToOptionsArray(categories: Array<any>): Array<InputOption> {
		return categories.map(cat => (
			 {
				label: cat.name,
				value: cat.id
			}
		));
	}

	componentWillReceiveProps(nextProps) {
	    if(nextProps.categories.length > 0) {
	    	this.setState({inputArray: this.state.inputArray.reduce((p,c) => {
	    		if (c.hasOwnProperty('children') && c.id === 'categories') {
	    			c.children = this.catsToOptionsArray(nextProps.categories);
	    			c.value = nextProps.categories.length > 0 && nextProps.categories[0].hasOwnProperty('id') ? nextProps.categories[0].id : '';
	    		}
	    		p.push(c);
	    		return p;
	    	},[])});
	    }
	}

  render() {
    return (
      <div>
      	<Form
      	inputArray={this.state.inputArray}
      	handleFormSubmit={this.props.handleFormSubmit} />
      </div>
    	);
  }
}

export default LinkForm;
