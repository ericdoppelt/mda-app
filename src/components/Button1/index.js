import React from 'react';

import './Button1.css'

export default ({ children, ...props }) => (
  <button className="button-1" style={props.style}>
    {children}
  </button>
);
