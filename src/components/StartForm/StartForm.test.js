
import React from 'react';
import ReactDOM from 'react-dom';
import StartForm from './StartForm';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<StartForm />, div);
});
