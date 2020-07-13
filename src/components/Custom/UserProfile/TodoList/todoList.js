import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FolderIcon from '@material-ui/icons/Folder';
import Avatar from '@material-ui/core/Avatar';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';




const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 720,
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    maxHeight: 400,
  },
  listSection: {
    backgroundColor: 'inherit',
  },
  ul: {
    backgroundColor: 'inherit',
    padding: 0,
  },
}));


 const instrDict = {'TAMU': ['Complete Registration', 'Complete Training', 'Ship Items'],
                    'NSRL': [],
                    'LBNL': ['Register with the Admine office','Complete the Affiliate Registration Form (ARF)', 'Complete General Employment Radiation Testing (GERT)'],
                    'MSU': ['Complete the Outside User Collaboration Form','Review Responsibilities for Experimenters ad NSRL','Spokesperson of the experiment or a designee participate in the short-term scheduling meeting at 1:45 pm (Mon-Fri), by arrangement on the weekend']};

 const eventArray = [{site:'TAMU',date:'8/06',time: '8am',integrator:'MDA',steps:[1,0,1]},
                     {site:'LBNL',date:'9/15',time:'12am',integrator:'MDA',steps:[1,1,1]},
                     {site:'TAMU', date:'10/10',time:'12pm',integrator:'MDA', steps:[1,1,0]},
                     {site:'MSU', date:'11/10',time:'8am',integrator:'MDA', steps:[0,1,0]}]



export default function TodoList() {


    TodoList.filterArrays = function (array1,array2) {
      var ret = [];
      for(var i=0;i<array1.length;i++){
        if(array2[i]==1){
          ret.push(array1[i]);
        }
      }
      return ret;
    }
     const classes = useStyles();

     return (
       <div className={classes.root}>

        <List className={classes.root} subheader={<li />}>
          {eventArray.map((eventDict) => (
            <li key={`Facility: ${eventDict.site}`} className={classes.listSection}>
              <ul className={classes.ul}>
                <ListSubheader><Typography>{`Facility: ${eventDict.site}, Date: ${eventDict.date} , Time: ${eventDict.time}, Integrator: ${eventDict.integrator} `}</Typography></ListSubheader>
                {TodoList.filterArrays(instrDict[eventDict.site],eventDict.steps).map((item) => (

                  <ListItem key={`item-${eventDict.site}`}>
                    <ListItemText primary={`${item}`} />
                    <ListItemSecondaryAction>
                       <Button edge="end" aria-label="delete">
                         <DeleteIcon />
                       </Button>
                     </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </ul>
            </li>
          ))}
        </List>
        </div>
     );
   }
