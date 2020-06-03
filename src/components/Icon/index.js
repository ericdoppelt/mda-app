import React from 'react';
import classNames from 'classnames';

import './Icon.css'

export default (props) => (
  <i className={classNames('icon', `fa fa-${props.liga}`)} style={props.style} />
);
