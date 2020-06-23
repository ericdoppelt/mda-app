import React from 'react';
import Image from '../../components/UIzard/Image';
import Row from '../../components/UIzard/Row';
import Title from '../../components/UIzard/Title';
import MDAHeader2 from '../../components/Custom/MDAHeader2';
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
        <Row style={{ flexGrow: '0', minWidth: '50px', minHeight: '50px' }}>
          <Image style={{ width: '250px', height: '250px', backgroundImage: 'url(/images/MDALogo.png)' }} />
          <Image style={{ width: '250px', height: '250px', backgroundImage: 'url(/images/ISEEULogo.png)' }} />
          <Image style={{ width: '250px', height: '250px', backgroundImage: 'url(/images/phoenix.png)' }} />
        </Row>
        <Title>
          COMING SOON...
        </Title>
      </main>
    </div>
  );
};
