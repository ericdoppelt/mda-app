import React from 'react';

import './Stack.css'

export default ({ children, ...props }) => (
  <div className="stack" style={props.style}>
    {children}
  </div>
);
