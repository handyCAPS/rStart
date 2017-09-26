
import React from 'react';
import ReactDOM from 'react-dom';
import EnterForm from './EnterForm';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<EnterForm />, div);
});
