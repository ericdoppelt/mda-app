import React from 'react';

import './Header.css'

export default ({ children, ...props }) => (
  <p className="header" style={props.style}>
    {children}
  </p>
);
