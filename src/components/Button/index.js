import React from 'react';

import './Button.css'

export default ({ children, ...props }) => (
  <button className="button" style={props.style}>
    {children}
  </button>
);
