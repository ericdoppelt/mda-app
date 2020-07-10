import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 720,
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    maxHeight: 300,
  },
  listSection: {
    backgroundColor: 'inherit',
  },
  ul: {
    backgroundColor: 'inherit',
    padding: 0,
  },
}));

 const instrDict = {'TAMU': ['Send request for beam time', 'Establish funding contract', 'Complete Safety Orientation'], 'NSRL': [], 'LBNL': ['Register with the Admine office','Complete the Affiliate Registration Form (ARF)', 'Complete General Employment Radiation Testing (GERT)'], 'MSU': ['Complete the Outside User Collaboration Form','Review Responsibilities for Experimenters ad NSRL','Spokesperson of the experiment or a designee participate in the short-term scheduling meeting at 1:45 pm (Mon-Fri), by arrangement on the weekend']};
 const eventArray = [{site:'TAMU',date:'8/06',time: '8am',integrator:'MDA'}, {site:'LBNL',date:'9/15',time:'12am',integrator:'MDA'},{site:'TAMU', date:'10/10',time:'12pm',integrator:'MDA'}, {site:'MSU', date:'11/10',time:'8am',integrator:'MDA'}]
export default function TodoList() {
  const classes = useStyles();

  return (
    <List className={classes.root} subheader={<li />}>
      {eventArray.map((eventDict) => (
        <li key={`Facility: ${eventDict.site}`} className={classes.listSection}>
          <ul className={classes.ul}>
            <ListSubheader>{`Facility: ${eventDict.site}, Date: ${eventDict.date} , Time: ${eventDict.time}, Integrator: ${eventDict.integrator} `}</ListSubheader>
            {instrDict[eventDict.site].map((item) => (
              <ListItem key={`item-${eventDict.site}`}>
                <ListItemText primary={`${item}`} />
              </ListItem>
            ))}
          </ul>
        </li>
      ))}
    </List>
  );
}
