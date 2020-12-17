import React from 'react';
import Typography from "@material-ui/core/Typography";
import { withStyles } from '@material-ui/core/styles';
import {Button, List, ListItem, ListItemSecondaryAction, ListItemText, ListSubheader} from '@material-ui/core';
import axios from 'axios';
import DeleteIcon from '@material-ui/icons/Delete';



const useStyles = theme => ({
  root: {
    width: '100%',
    maxWidth: 720,
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    maxHeight: 500,
  },
  listSection: {
    backgroundColor: 'inherit',
  },
  ul: {
    backgroundColor: 'inherit',
    padding: 0,
  },
});


const instrDict = {'TAMU': ['Complete Registration', 'Complete Training', 'Ship Items'],
                   'NSRL': [],
                   'LBNL': ['Register with the Admine office','Complete the Affiliate Registration Form (ARF)', 'Complete General Employment Radiation Testing (GERT)'],
                   'MSU': ['Complete the Outside User Collaboration Form','Review Responsibilities for Experimenters ad NSRL','Spokesperson of the experiment or a designee participate in the short-term scheduling meeting at 1:45 pm (Mon-Fri), by arrangement on the weekend']};

class UsertodoList extends React.Component {


    constructor(props) {
      super(props);



    this.state = {
      id: 0,
      eventArray: [],
      steps: [],
      }
    }

      filterArrays = (array1,array2) => {
        var ret = [];
        for(var i=0;i<array1.length;i++){
          if(array2[i]===1){
            ret.push({message:array1[i],idx:i});
          }
        }
        return ret;
      }

      toggleIndex = (array,idx) => {
        array[idx] = !array[idx];
        return array;
      }

      async componentDidMount(event) {
        var self = this;
        let url = "https://vcm-17934.vm.duke.edu/api/calendar/tasks";
        await axios.get(url, {
          headers: { Authorization: `Bearer ${window.sessionStorage.getItem("access_token")}` }
          }).then(response => {
          //console.log(response);
          self.setState({
      eventArray: response.data.eventArray,
      });
      })
      .catch(error => {
      console.log("error");
      console.log(error);
      });
      }

      async handleDelete(event,id,steps) {
        //console.log(id);
        //console.log(steps);
        //console.log(window.sessionStorage.getItem("access_token"));
        var self = this;
        let url = "https://vcm-17934.vm.duke.edu/api/calendar/tasks";
        await axios.post(url, {
          id: id,
          steps: steps},
          {headers: { Authorization: `Bearer ${window.sessionStorage.getItem("access_token")}` }
          }).then(response => {
            console.log(response.data.eventArray[0]);
          self.setState({
            eventArray: response.data.eventArray,
          });
        }).catch(error => {
            alert(error);
            console.log(error)
        });
      }
      render () {
        var self = this;
        const {classes} = this.props;
         return (
        <div className={classes.root}>
         <List className={classes.root} subheader={<li />}>
           {this.state.eventArray.map((eventDict,dictIndex) => (
             <li key={`Facility: ${eventDict.site}-${dictIndex}`} className={classes.listSection}>
               <ul className={classes.ul}>
                 <ListSubheader><Typography>{`Facility: ${eventDict.site}, Date: ${eventDict.date} , Time: ${eventDict.time}, Integrator: ${eventDict.integrator} `}</Typography></ListSubheader>
                 {self.filterArrays(instrDict[eventDict.site],eventDict.steps).map((item,itemIndex) => (

                   <ListItem key={`${eventDict.site}-${itemIndex}`}>
                     <ListItemText primary={`${item.message}`} />
                     <ListItemSecondaryAction>
                        <Button edge="end" aria-label="delete">
                          <DeleteIcon onClick={(event) => this.handleDelete(event, eventDict.id, this.toggleIndex(eventDict.steps,item.idx)) }/>
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
    }

export default withStyles(useStyles, { withTheme: true })(UsertodoList);
