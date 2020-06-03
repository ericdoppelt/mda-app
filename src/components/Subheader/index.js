import React from 'react';

import './Subheader.css'

export default ({ children, ...props }) => (
  <p className="subheader" style={props.style}>
    {children}
  </p>
);
