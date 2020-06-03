import React from 'react';

import './NavigationFooter.css'

export default ({ children, ...props }) => (
  <div className="navigation-footer" style={props.style}>
    {children}
  </div>
);
