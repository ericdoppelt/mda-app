import React from 'react';
import classNames from 'classnames';

import './ButtonIcon.css'

export default (props) => (
  <button className={classNames('button-icon', `fa fa-${props.liga}`)} style={props.style}>
    <i className="button-icon-icon" />
  </button>
);
