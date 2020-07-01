import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import Row from '../../UIzard/Row'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

class IonSearch extends React.Component {
  constructor(props) {
    super(props);
    this.handleSearch = this.handleSearch.bind(this);

    this.state = {
      ion: "",
      energy: "",
      facilities: [],
      errorMessage: "",
    }
  }

  async handleSearch(event) {
    event.preventDefault();
    let url = 'https://mda-phoenix.herokuapp.com/filterion';

    await axios.post(url, {
      ion: this.state.ion,
      energy: this.state.energy
    }).then(response => {
      console.log(response);
      if (response.data.success === true) {
        this.setState({facilities: response.data.facilities});
        console.log(response.data.facilities)
      }
      else {
        this.setState({errorMessage: response.data.error})
      }
    }).catch(error => {
        alert(error);
        console.log(error)
    });
  }

    render() {
      return (
        <div className="ionsearch">
          <TextField
            id="outlined-basic"
            label="Ion"
            variant="outlined"
            onChange={event => {this.setState({ion: event.target.value})}}
            />

          <TextField
            id="outlined-basic"
            label="Energy"
            variant="outlined"
            onChange={event => {this.setState({energy: event.target.value})}}
            />

          <Button variant="contained" style={{height: '50px', width: '150px'}} onClick={(event) => this.handleSearch(event)}>
            Search
            </Button>
            </div>
          );
  }
}

export default withRouter(IonSearch);
