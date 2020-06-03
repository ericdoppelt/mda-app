import React from 'react';

import './InputField.css'

export default (props) => (
  <input type="text" className="input-field" style={props.style} placeholder={props.placeholder} />
);
