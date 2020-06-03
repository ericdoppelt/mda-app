import React from 'react';

import './Caption.css'

export default ({ children, ...props }) => (
  <p className="caption" style={props.style}>
    {children}
  </p>
);
