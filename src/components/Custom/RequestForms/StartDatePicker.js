import React from 'react';
import {Button, Dialog, DialogTitle, DialogContent, DialogActions} from '@material-ui/core';
import 'react-nice-dates/build/style.css'
import { withStyles } from '@material-ui/core/styles';
import { observer } from "mobx-react"
import InfiniteCalendar from 'react-infinite-calendar';
import ExperimentStore from '../../../stores/ExpirementStore';

const useStyles = theme => ({
    startButton: {
      backgroundColor: "#bfffc8",
      marginTop: '20px',
      marginLeft:'5%',
      marginRight: '5%',
      width: '90%',
    },
    fullDiv: {
      width: '100%',
    }});

class StartDatePicker extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        open: false,
      }
    }

    render() {
      const { classes } = this.props;
      return(
        <div className = {classes.fullDiv}>
          <Button className={classes.startButton} onClick={() => this.setState({open: true})}>
            Select Start Date
          </Button>
          <Dialog open={this.state.open} onClose={() => this.setState({open: false})}>
            <DialogTitle>Please enter a desired start date.</DialogTitle>
            <DialogContent>
            <InfiniteCalendar
              selected={ExperimentStore.startDate}
              onSelect={(event) => {ExperimentStore.setStartDate(event)}}
              minDate={new Date()}
              min={new Date()}
            />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => this.setState({open: false})}>
                Select Start Date
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      );
    }
}

export default withStyles(useStyles)(observer(StartDatePicker));
  