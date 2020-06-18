import React from 'react';

import './Row.css'

export default ({ children, ...props }) => (
  <div className="row" style={props.style}>
    {children}
  </div>
);
