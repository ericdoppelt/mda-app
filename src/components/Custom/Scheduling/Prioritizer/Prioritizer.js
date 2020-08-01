import { Button, Card, CardHeader, Checkbox, Grid, List, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { observer } from "mobx-react";
import React from 'react';
import SchedulingStore from '../../../../stores/SchedulingStore';
import LBNLScheduler from '../LBNLScheduler';

  const useStyles = theme => ({
    root: {
        margin: 'auto',
        width: '100%',
      },
      card: {
        marginTop: '20px',
        width: 350,
        height: 475,
        overflow: 'auto',
      },
      button: {
        margin: theme.spacing(0.5, 0),
      },
    });

class Prioritizer extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
          priority: [],
          general: [],
          checked: [],
          hours: this.props.hours,
          startDateTime: this.props.start,
          endDateTime: this.props.end,
      }
  }

  componentDidMount() {
    
    if ((window.sessionStorage.getItem("access_token") === null)) this.props.history.push('user-login');
    else {
    let i = 0;
    console.log(SchedulingStore.requests);
    let possibleRequests = SchedulingStore.rangeRequests(this.props.start, this.props.end, this.props.facility); 
    console.log("break");
    console.log(possibleRequests);
    let self = this;
    var requestsChecked = possibleRequests.map(function(request) {
      var requestOut = Object.assign({}, request);
      requestOut.checkedIndex = i;
      self.state.checked[i] = false;
      i++;
      return requestOut;
    });
    this.setState({ general : requestsChecked});
  }
}

toggleChecked(request) {
    let newState = this.state.checked;
    newState[request.checkedIndex] = !newState[request.checkedIndex];
    this.setState({checked: newState});
}

getList(listArray, title) {
    const {classes} = this.props;
    var numChecked = 0;
    for (var i = 0; i < listArray.length; i++) {
      if (this.state.checked[listArray[i].checkedIndex]) numChecked++;
    }
    return(
    <Card className={classes.card}>
      <CardHeader
        title={title}
        subheader={`${numChecked}/${listArray.length} selected`}
        >
      </CardHeader>
      <List dense component="div" role="list">
        {listArray.map((value, index) => {
          //const i = index;
          return (
            <ListItem key={value.name} role="listitem" button onClick={() => this.toggleChecked(value)}>
              <ListItemIcon>
                <Checkbox
                  disableRipple
                  checked = {this.state.checked[value.checkedIndex]}
                />
              </ListItemIcon>
              <ListItemText primary={value.name + " for "  + value.company} secondary={"Start: ION | End: ION"} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Card>
    );
}

  pushAllPriority() {
    let newPriority = this.state.priority.concat(this.state.general);
    this.setState({
      priority: newPriority,
      general: [],
    });
  }

  pushCheckedPriority() {

    var newGeneral = this.state.general.slice(0);
    var newPriority = this.state.priority.slice(0);

    for (var i = 0; i < this.state.general.length; i++) {
      let tempIndex = this.state.general[i].checkedIndex;
      if (this.state.checked[tempIndex]) {
        console.log(tempIndex);
        let tempRequest = this.state.general[i];
        newPriority.push(tempRequest);
        let removedIndex = newGeneral.indexOf(this.state.general[i]);
        console.log(newGeneral);
        newGeneral.splice(removedIndex, 1);
        console.log(newGeneral);
      }
    }
    this.setState({
      general: newGeneral,
      priority: newPriority,
    });
  }

  pushCheckedGeneral() {

    var newGeneral = this.state.general.slice(0);
    var newPriority = this.state.priority.slice(0);

    for (var i = 0; i < this.state.priority.length; i++) {
      let tempIndex = this.state.priority[i].checkedIndex;
      if (this.state.checked[tempIndex]) {
        let tempRequest = this.state.priority[i];
        newGeneral.push(tempRequest);
        let removedIndex = newPriority.indexOf(this.state.priority[i]);
        newPriority.splice(removedIndex, 1);
      }
    }
    this.setState({
      general: newGeneral,
      priority: newPriority,
    });
  }

  pushAllGeneral() {
    let newGeneral = this.state.general.concat(this.state.priority);
    this.setState({
      general: newGeneral,
      priority: [],
    });
  }


  moveToScheduling() {
    SchedulingStore.setFacility(this.props.facility);
    SchedulingStore.setPriorities(this.state.priority);
    SchedulingStore.setGenerals(this.state.general);
    SchedulingStore.setSuggestion(LBNLScheduler(this.state.priority, this.state.general, this.state.startDateTime, this.state.endDateTime));
    SchedulingStore.setStartDateTime(this.state.startDateTime)
    SchedulingStore.setEndDateTime(this.state.endDateTime);
    console.log(SchedulingStore);
    SchedulingStore.toggleCalendar();

    //let testSchedule = LBNLScheduler(this.state.priority, this.state.general, this.state.startDateTime, this.state.hours);
  }

  getHeader() {
    let start = new Date(this.props.start);
    let startDisplay = start.toDateString();

    let end = new Date(this.props.end);
    let endDisplay = end.toDateString();
    return startDisplay + " to " + endDisplay + " @ " + this.props.facility;
  }

  render() {
    const {classes} = this.props;
 
    return(
      <div>
        <Typography
        variant="h5">
          {this.getHeader()}
        </Typography>
        <Grid container direction="row" spacing={2} justify="center" alignItems="center" className={classes.root}>
          <Grid item>
          {this.getList(this.state.general, "General")}
          </Grid>
          <Grid item>
          <Grid container direction="column" alignItems="center">
            <Button
              variant="outlined"
              size="small"
              className={classes.button}
              onClick={() => this.pushAllPriority()}
              disabled={this.state.general.length === 0}
            >
              ≫
            </Button>
            <Button
              variant="outlined"
              size="small"
              className={classes.button}
              onClick={() => this.pushCheckedPriority()}
              disabled={this.state.general.length === 0}
            >
              &gt;
            </Button>
            <Button
              variant="outlined"
              size="small"
              className={classes.button}
              onClick={() => this.pushCheckedGeneral()}
              disabled={this.state.priority.length === 0}
            >
              &lt;
            </Button>
            <Button
              variant="outlined"
              size="small"
              className={classes.button}
              onClick={() => this.pushAllGeneral()}
              disabled={this.state.priority.length === 0}
            >
              ≪
            </Button>
            </Grid>
          </Grid>
          <Grid item>
          {this.getList(this.state.priority, "Priority")}
          </Grid>
        </Grid>
        <Button 
          variant="contained"
          onClick={(event) => this.moveToScheduling()}
          style={{margin: 'auto', marginTop: '10px', marginBottom: '10px', width: '96%', height: '60px'}}
          >
          Move to Scheduling
      </Button>
      </div>
    );
  }
}


export default withStyles(useStyles)(observer(Prioritizer));