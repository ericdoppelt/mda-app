import React from 'react';

import './Paragraph.css'

export default ({ children, ...props }) => (
  <p className="paragraph" style={props.style}>
    {children}
  </p>
);
