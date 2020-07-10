import React from 'react';
import axios from 'axios';
import {Card, Button, Grid, List, ListItem, ListItemIcon, Checkbox, ListItemText, CardHeader} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';


  const useStyles = theme => ({
    root: {
        margin: 'auto',
        width: '100%',
      },
      card: {
        width: 280,
        height: 300,
        overflow: 'auto',
      },
      button: {
        margin: theme.spacing(0.5, 0),
      },
    });

class Schedule extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
          scheduled: [],
          unscheduled: [],
          checked: [],
      }
  }

  async componentDidMount() {
      
    if ((window.sessionStorage.getItem("access_token") === null)) this.props.history.push('user-login');
    else {
    let url = 'https://mda-phoenix.herokuapp.com/getforms/integrator';
    let self = this;
    await axios.post(url, null, {
        headers: { Authorization: `Bearer ${window.sessionStorage.getItem("access_token")}` }
      }).then(response => {
        var i = 0;
        var requestsChecked = response.data.requests.map(function(request) {
            var request = Object.assign({}, request);
            request.checkedIndex = i;
            self.state.checked[i] = false;
            i++;
            return request;
        });
        self.setState({ unscheduled : requestsChecked});
        })
        .catch(error => {
        alert(error);
    });


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
          const i = index;
          return (
            <ListItem key={value.name} role="listitem" button onClick={() => this.toggleChecked(value)}>
              <ListItemIcon>
                <Checkbox
                  disableRipple
                  checked = {this.state.checked[value.checkedIndex]}
                  onClick = {() => console.log(this.state.checked[value.checkedIndex])}
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

  pushAllScheduled() {
    let newScheduled = this.state.scheduled.concat(this.state.unscheduled);
    this.setState({
      scheduled: newScheduled,
      unscheduled: [],
    });
  }

  pushCheckedScheduled() {

    var newUnscheduled = this.state.unscheduled.slice(0);
    var newScheduled = this.state.scheduled.slice(0);

    for (var i = 0; i < this.state.unscheduled.length; i++) {
      let tempIndex = this.state.unscheduled[i].checkedIndex;
      console.log(tempIndex);
      if (this.state.checked[tempIndex]) {
        let tempRequest = this.state.unscheduled[i];
        newScheduled.push(tempRequest);
        let removedIndex = newUnscheduled.indexOf(this.state.unscheduled[i]);
        console.log("before");
        console.log(removedIndex);
        console.log(newUnscheduled);
        newUnscheduled.splice(removedIndex, 1);
        console.log(newUnscheduled);
      }
    }
    this.setState({
      unscheduled: newUnscheduled,
      scheduled: newScheduled,
    });
  }

  pushCheckedUnscheduled() {

    var newUnscheduled = this.state.unscheduled.slice(0);
    var newScheduled = this.state.scheduled.slice(0);

    for (var i = 0; i < this.state.scheduled.length; i++) {
      let tempIndex = this.state.scheduled[i].checkedIndex;
      if (this.state.checked[tempIndex]) {
        let tempRequest = this.state.scheduled[i];
        newUnscheduled.push(tempRequest);
        let removedIndex = newScheduled.indexOf(this.state.scheduled[i]);
        newScheduled.splice(removedIndex, 1);
      }
    }
    this.setState({
      unscheduled: newUnscheduled,
      scheduled: newScheduled,
    });
  }

  pushAllUnscheduled() {
    let newUnscheduled = this.state.unscheduled.concat(this.state.scheduled);
    this.setState({
      unscheduled: newUnscheduled,
      scheduled: [],
    });
  }

  pushCheckedUnscheduled

  
  render() {
    const {classes} = this.props;
    return(
        <Grid container direction="row" spacing={2} justify="center" alignItems="center" className={classes.root}>
          <Grid item>
          {this.getList(this.state.unscheduled, "Unscheduled")}
          </Grid>
          <Grid item>
          <Grid container direction="column" alignItems="center">
            <Button
              variant="outlined"
              size="small"
              className={classes.button}
              onClick={() => this.pushAllScheduled()}
              disabled={this.state.unscheduled.length === 0}
            >
              ≫
            </Button>
            <Button
              variant="outlined"
              size="small"
              className={classes.button}
              onClick={() => this.pushCheckedScheduled()}
              disabled={this.state.unscheduled.length === 0}
            >
              &gt;
            </Button>
            <Button
              variant="outlined"
              size="small"
              className={classes.button}
              onClick={() => this.pushCheckedUnscheduled()}
              disabled={this.state.scheduled.length === 0}
            >
              &lt;
            </Button>
            <Button
              variant="outlined"
              size="small"
              className={classes.button}
              onClick={() => this.pushAllUnscheduled()}
              disabled={this.state.scheduled.length === 0}
            >
              ≪
            </Button>
            </Grid>
          </Grid>
          <Grid item>
          {this.getList(this.state.scheduled, "Scheduled")}
          </Grid>
        </Grid>
    );
  }
}


export default withStyles(useStyles)(Schedule);