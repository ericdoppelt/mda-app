import React from 'react';
import classNames from 'classnames';

import './Checkbox.css'

export default (props) => (
  <label className="checkbox" style={props.style}>
    <i checked={props.checked} className={classNames('fa', 'fa-check', 'checkbox-toggle')} />
    <input type="checkbox" defaultChecked={props.checked} className="checkbox-input" />
  </label>
);
