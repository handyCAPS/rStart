
import React from 'react';
import ReactDOM from 'react-dom';
import CatForm from './CatForm';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CatForm />, div);
});
