import React from 'react';
import Image from '../../components/UIzard/Image';
import Card from '../../components/UIzard/Card';
import Row from '../../components/UIzard/Row';
import Title from '../../components/UIzard/Title';
import MDAHeader2 from '../../components/Custom/MDAHeader2';
import * as Constants from '../../constants'
import { ThemeProvider } from '@material-ui/core/styles';


export default function Home() {

  const classes = Constants.useStyles();
  return (
    <ThemeProvider theme={Constants.darkTheme}>
      <div className={classes.root}>
        <MDAHeader2/>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Row style={{ justifyContent: 'center', alignSelf: 'auto', minWidth: '1000px', minHeight: '50px' }}>
            <Card style={{ justifyContent: 'center', alignItems: 'auto', minWidth: '1000px', minHeight: '600px', flexGrow: '0' }}>
              <Row style={{ justifyContent: 'center', flexGrow: '0', minWidth: '50px', minHeight: '50px' }}>
                <Image style={{ width: '250px', height: '250px', backgroundImage: 'url(/images/MDALogo.png)' }} />
                <Image style={{ width: '250px', height: '250px', backgroundImage: 'url(/images/ISEEULogo.png)' }} />
                <Image style={{ width: '250px', height: '250px', backgroundImage: 'url(/images/phoenix.png)' }} />
              </Row>
              <Title>
                COMING SOON...
              </Title>
            </Card>
          </Row>
        </main>
      </div>
    </ThemeProvider>
  );
};
