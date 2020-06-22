import React from 'react';

import './Title.css'

export default ({ children, ...props }) => (
  <p className="title" style={props.style}>
    {children}
  </p>
);
