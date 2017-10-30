// @flow
import React from 'react';

import './ImageForm.css';

import StartForm from '../StartForm/StartForm';

import type { Input } from '../../types/input.type';

type State = {
  inputArray: Array<Input>
};

class ImageForm extends StartForm {
  constructor() {
    super();
    this.state = {
      inputArray: [
        {
          id: 'Name',
          value: '',
          errors: []
        }
      ]
    };

    this.formName = 'Add Image';
  }
}

export default ImageForm;
