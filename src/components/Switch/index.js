import React from 'react';

import './Switch.css'

export default (props) => (
  <label className="switch" style={props.style}>
    <div checked={props.checked} className="switch-toggle" />
    <input type="checkbox" defaultChecked={props.checked} className="switch-input" />
  </label>
);
