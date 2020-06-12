import React from 'react';

import Card from '../../components/Card';
import Checkbox from '../../components/Checkbox';
import Header from '../../components/Header';
import Main from '../../components/Main';
import Paragraph from '../../components/Paragraph';
import Radio from '../../components/Radio';
import Row from '../../components/Row';
import Stack from '../../components/Stack';
import Switch from '../../components/Switch';
import Title from '../../components/Title';
import DemoApp from '../../components/Calendar/DemoApp';
import MDAHeader from '../../components/MDAHeader';
import {Button} from '@material-ui/core';

export default () => (
  <Main style={{ justifyContent: 'center', alignItems: 'center' }}>
    <MDAHeader/>
    <DemoApp/>
  </Main>
);
