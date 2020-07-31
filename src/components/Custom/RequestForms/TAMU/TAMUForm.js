import React from 'react';
import InfiniteCalendar, {Calendar, withMultipleDates, defaultMultipleDateInterpolation} from 'react-infinite-calendar';
import {Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography} from '@material-ui/core';
import TAMUStore from '../../../../stores/TAMUStore';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import { observer } from "mobx-react"

const useStyles = theme => ({
    fullDiv: {
      width: '100%',
    },
    unavailableButton: {
      backgroundColor: "#f5c1b8",
      marginTop: '13px',
      marginLeft: '5%',
      marginRight: '5%',
      width: '90%',
    },
  });

class TAMUForm extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          open: 
          false
      }
      TAMUStore.clear();
  }

  setBadDate(date) {
    TAMUStore.setBadDates(date);
    this.forceUpdate();
  }

  render() {
    const { classes } = this.props;
    return(
    <div className={classes.fullDiv}>
      <br/>
      <br/>
      <Typography variant="subtitle1">Please enter the following supplemental information for TAMU.</Typography>
      <Button className={classes.unavailableButton} onClick={() => this.setState({open: true})}>Select Unavailable Dates</Button>
      <Dialog open={this.state.open} onClose={() => this.setState({open: false})}>
        <DialogTitle>Please enter dates you cannot run.</DialogTitle>
        <DialogContent>
          <InfiniteCalendar
            Component={withMultipleDates(Calendar)}	
            selected={TAMUStore.badDates}
            onSelect={(event) => this.setBadDate(event)}
            minDate={new Date()}
            min={new Date()}
            interpolateSelection={defaultMultipleDateInterpolation}	
          />
        </DialogContent>
          <DialogActions>
            <Button onClick={() => {this.setState({open: false})}}>
              Select Dates
            </Button>
          </DialogActions>
      </Dialog>
    </div>
    );
  }
}

export default withRouter(withStyles(useStyles)(observer(TAMUForm)));