import React from 'react';

import './NavigationHeader.css'

export default ({ children, ...props }) => (
  <div className="navigation-header" style={props.style}>
    {children}
  </div>
);
