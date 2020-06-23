import React from 'react';

import Image from '../../../components/UIzard/Image';
import Stack from '../../../components/UIzard/Stack';
import Title from '../../../components/UIzard/Title';
import ViewRequests from '../../../components/Custom/ViewRequests';
import Card from '../../../components/UIzard/Card';
import Row from '../../../components/UIzard/Row';
import MDAHeader2 from '../../../components/Custom/MDAHeader2';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    margin: 'auto',
  },
  appBarSpacer: theme.mixins.toolbar
}));

export default function Home() {

  const classes = useStyles();

  return (
    <div className={classes.root} style={{ display:'flex', justifyContent:'center' }}>
      <MDAHeader2/>
      <main className={classes.content}> 
        <div className={classes.appBarSpacer} />
        <Row style={{ justifyContent: 'flex-start', alignSelf: 'auto', minWidth: '50px', minHeight: '50px' }}>
          <Card style={{ justifyContent: 'center', alignItems: 'flex-end', minWidth: '50px', minHeight: '600px', width: '900px', flexGrow: '0' }}>
            <Stack style={{ justifyContent: 'flex-start', minWidth: '50px', minHeight: '50px' }}>
              <Image style={{ width: '200px', height: '200px', backgroundImage: 'url(/images/MDALogo.png)' }} />
              <Title>
                Beam Request Forms
              </Title>
              <ViewRequests/>
            </Stack>
          </Card>
        </Row>
      </main>
    </div>
  );
};
