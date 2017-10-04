// @flow
import StartForm from '../StartForm/StartForm';

import './CatForm.css';

import { Input } from '../../types/input.type';

type Props = {
	handleSubmit: Function;
};

type State = {
	inputArray: Array<Input>;
};

class CatForm extends StartForm {

	constructor() {
		super();

		this.state = {
			inputArray: [
				{
					id: 'name',
					value: '',
					attributes: {
						required: true
					},
					errors: []
				},
				{
					id: 'excludeFromBestOf',
					label: 'Exclude From Bestof',
					type: 'checkbox',
					value: '',
					errors: []
				}
		]};

		this.formName = 'Add Category';
	}

}

export default CatForm;
