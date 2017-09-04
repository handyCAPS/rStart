
import React from 'react';
import ReactDOM from 'react-dom';
import FormInputGroup from './FormInputGroup';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<FormInputGroup />, div);
});
