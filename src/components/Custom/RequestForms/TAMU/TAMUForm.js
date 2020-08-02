import React from 'react';
import InfiniteCalendar, {Calendar, withMultipleDates, defaultMultipleDateInterpolation} from 'react-infinite-calendar';
import {Button, Divider, Dialog, DialogTitle, DialogContent, DialogActions, Typography} from '@material-ui/core';
import TAMUStore from '../../../../stores/TAMUStore';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import { observer } from "mobx-react"

const useStyles = theme => ({
    fullDiv: {
      width: '100%',
    },
    unavailableButton: {
      marginTop: '13px',
      marginLeft: '5%',
      marginRight: '5%',
      width: '90%',
      height: '50px',
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
      <Divider/>
      <br/>
      <Typography variant="subtitle1">Please enter the following supplemental information for TAMU.</Typography>
      <Button color='secondary' variant='contained' className={classes.unavailableButton} onClick={() => this.setState({open: true})}>Select Unavailable Dates</Button>
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
            <Button variant='contained' color='secondary' onClick={() => {this.setState({open: false})}}>
              Select Dates
            </Button>
          </DialogActions>
      </Dialog>
    </div>
    );
  }
}

export default withRouter(withStyles(useStyles)(observer(TAMUForm)));