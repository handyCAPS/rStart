
import React from 'react';
import ReactDOM from 'react-dom';
import LogOut from './LogOut';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<LogOut />, div);
});
