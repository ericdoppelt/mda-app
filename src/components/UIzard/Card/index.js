import React from 'react';

import './Card.css'

export default ({ children, ...props }) => (
  <div className="card" style={props.style}>
    {children}
  </div>
);
