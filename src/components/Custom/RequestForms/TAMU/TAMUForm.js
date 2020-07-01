import React from 'react';
import InfiniteCalendar, {Calendar, withMultipleDates, defaultMultipleDateInterpolation} from 'react-infinite-calendar';
import {Button, Dialog, DialogTitle, DialogContent, DialogActions, Box} from '@material-ui/core';
import TAMUStore from '../../../../stores/TAMUStore';
import { withStyles } from '@material-ui/core/styles';

const useStyles = theme => ({
    unavailableButton: {
      backgroundColor: "#f5c1b8",
      width: '100%',
      marginBottom: '15px',
    },
  });

class TAMUForm extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          open: false
      }
  }

  render() {
    const { classes } = this.props;
    return(
    <div>
      <Box>Please enter the following supplemental and optional information for TAMU.</Box>
      <Button className={classes.unavailableButton} onClick={() => this.setState({open: true})}>Select Unavailable Dates</Button>
      <Dialog open={this.state.open} onClose={() => this.setState({open: false})}>
        <DialogTitle>Please enter dates you cannot run.</DialogTitle>
        <DialogContent>
          <InfiniteCalendar
            Component={withMultipleDates(Calendar)}
            selected={TAMUStore.badDates}
            onSelect={(event) => TAMUStore.setBadDates(event.target.value)}
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

export default withStyles(useStyles)(TAMUForm);