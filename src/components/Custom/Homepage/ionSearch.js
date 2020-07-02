import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import Row from '../../UIzard/Row';
import Paragraph from '../../../components/UIzard/Paragraph';
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
    this.handleSearch= this.handleSearch.bind(this);

    this.state = {
      ion: "",
      energy: "",
      facilities: ["Test1", "Test2"],
      errorMessage: "",
    }
  }

  async handleSearch(event) {
    event.preventDefault();
    console.log("called");
    console.log(this.state.ion);
    console.log(this.state.energy);
    let url = 'https://mda-phoenix.herokuapp.com/filterion';
    var self = this;
    await axios.post(url, {
      ion: self.state.ion,
      energy: self.state.energy
    }).then(response => {
      console.log(response);
      self.setState({facilities: response.data.facilities});
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

            <Paragraph>
            {this.state.facilities}
            </Paragraph>
            </div>
          );
  }
}

export default withRouter(IonSearch);
