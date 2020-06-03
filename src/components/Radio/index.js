import React from 'react';

import './Radio.css'

export default (props) => (
  <label className="radio" style={props.style}>
    <div checked={props.checked} className="radio-toggle" />
    <input type="checkbox" defaultChecked={props.checked} className="radio-input" />
  </label>
);
