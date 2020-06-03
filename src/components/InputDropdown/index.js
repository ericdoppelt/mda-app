import React from 'react';

import './InputDropdown.css'

export default (props) => (
  <div className="input-dropdown" style={props.style}>
    <select className="input-dropdown-input-dropdown">
      <option value="text" selected={props.true} className="input-dropdown-option" />
    </select>
    <i className="input-dropdown-icon" />
  </div>
);
