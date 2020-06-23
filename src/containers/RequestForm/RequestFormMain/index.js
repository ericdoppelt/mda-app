import React from 'react';

import Row from '../../../components/UIzard/Row';
import RequestSelector from '../../../components/Custom/RequestSelector';
import Stack from '../../../components/UIzard/Stack';
import MDAHeader2 from '../../../components/Custom/MDAHeader2';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  appBarSpacer: theme.mixins.toolbar
}));

export default function Home() {

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <MDAHeader2/>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Row style={{ justifyContent: 'flex-start', alignSelf: 'auto', minWidth: '50px', minHeight: '50px' }}>
          <Stack style={{ justifyContent: 'center', alignItems: 'flex-end', minWidth: '50px', minHeight: '600px', width: '900px', flexGrow: '0' }}>
            <Row style={{ justifyContent: 'center', minWidth: '50px', minHeight: '50px' }}>
              <RequestSelector/>
            </Row>
          </Stack>
        </Row>
      </main>
    </div>
  );
};
