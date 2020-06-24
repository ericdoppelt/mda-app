import React from 'react';
import { Link } from 'react-router-dom';

import Image from '../../../components/UIzard/Image';
import Paragraph from '../../../components/UIzard/Paragraph';
import Row from '../../../components/UIzard/Row';
import Stack from '../../../components/UIzard/Stack';
import MDAHeader2 from '../../../components/Custom/MDAHeader2';
import * as Constants from '../../../constants'
import { ThemeProvider } from '@material-ui/core/styles';


export default function Home() {

  const classes = Constants.useStyles();
  return (
    <ThemeProvider theme={Constants.darkTheme}>
      <div className={classes.root}>
        <MDAHeader2/>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
        <Stack style={{ flexGrow: '0', minWidth: '50px', minHeight: '50px' }}>
          <Row style={{ justifyContent: 'center', flexGrow: '0', minWidth: '50px', minHeight: '50px' }}>
            <Paragraph>
              Facility Information
            </Paragraph>
          </Row>
          <Stack style={{ flexGrow: '0', minWidth: '50px', minHeight: '50px' }}>
            <Row style={{ justifyContent: 'center', flexGrow: '0', minWidth: '50px', minHeight: '50px' }}>
              <Link to="/facilities-tamu">
                <Image style={{ width: '210px', height: '150px', backgroundImage: 'url(/images/tamulogo.png)' }} />
              </Link>
              <Link to="/facilities-lbnl">
                <Image style={{ width: '210px', height: '150px', backgroundImage: 'url(/images/LBNLLogo.jpg)' }} />
              </Link>
            </Row>
            <Row style={{ justifyContent: 'center', flexGrow: '0', minWidth: '50px', minHeight: '50px' }}>
              <Link to="/facilities-nsrl">
                <Image style={{ width: '210px', height: '120px', backgroundImage: 'url(/images/brnllogo.png)' }} /> 
              </Link>
              <Link to="facilities-msu">
                <Image style={{ width: '210px', height: '150px', backgroundImage: 'url(/images/MSULogo.png)' }} />
              </Link>
            </Row>
          </Stack>
          <Row style={{ justifyContent: 'center', flexGrow: '0', minWidth: '50px', minHeight: '50px' }}>
            <Paragraph>
              Choose a facility to continue...
            </Paragraph>
          </Row>
        </Stack>
        </main>
      </div>
    </ThemeProvider>
  );
};
