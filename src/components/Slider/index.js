import React from 'react';

import './Slider.css'

export default (props) => (
  <div className="slider" style={props.style}>
    <div className="slider-track" />
    <div className="slider-range" />
    <div className="slider-toggle" />
  </div>
);
