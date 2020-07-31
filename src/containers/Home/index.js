import { ThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import MDAHeader2 from '../../components/Custom/MDAHeader2';
import Image from '../../components/UIzard/Image';
import Row from '../../components/UIzard/Row';
import * as Constants from '../../constants';


export default function Home() {

  const classes = Constants.useStyles();
  return (
    <ThemeProvider theme={Constants.darkTheme}>
      <div className={classes.root}>
        <MDAHeader2/>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
              <Row style={{ justifyContent: 'center', flexGrow: '0', minWidth: '50px', minHeight: '50px' }}>
                {/* <Image style={{ width: '250px', height: '250px', backgroundImage: 'url(/images/MDALogo.png)' }} />} */}
                 <Image style={{ width: '250px', height: '250px', backgroundImage: 'url(/images/ISEEULogo.png)' }} />
                <Image style={{ width: '250px', height: '250px', backgroundImage: 'url(/images/phoenix.png)' }} />
              </Row>
              <Row style={{ justifyContent: 'center', flexGrow: '0', minWidth: '50px', minHeight: '50px' }}>
              </Row>
        </main>
      </div>
    </ThemeProvider>
  );
};
