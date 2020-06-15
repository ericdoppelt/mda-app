import React from 'react';

import './CardNoShadow.css'

export default ({ children, ...props }) => (
  <div className="card-no-shadow" style={props.style}>
    {children}
  </div>
);
