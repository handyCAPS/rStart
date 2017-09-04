// @flow
import React from 'react';

import './Skeleton.css';

type Props = {};

type State = {};

class Skeleton extends React.Component<Props, State> {
  render() {
    return (
    	<div className="Skeleton" {...this.props}></div>
      );
  }
}

export default Skeleton;
