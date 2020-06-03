import React from 'react';

import './Main.css'

export default ({ children, ...props }) => (
  <div className="main" style={props.style}>
    {children}
  </div>
);
