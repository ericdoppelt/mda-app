import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import Row from '../../UIzard/Row';
import Paragraph from '../../../components/UIzard/Paragraph';
import Title from '../../../components/UIzard/Title';
import Card from '../../../components/UIzard/Card';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';



const facilityLinks = {'':{info:'', request:''},
                       'Texas A&M': {info:'/facilities-tamu', 'request': '/request-tamu'},
                       'Lawrence Berkeley National Laboratory': {info:'/facilities-LBNL', request: '/request-LBNL'},
                       'NASA Space Radiation Laboratory': {info:'/facilities-NSRL', request: '/request-NSRL'},
                       'Michigan State University': {info:'/facilities-MSU', request: '/request-MSU'}}

class IonSearch extends React.Component {


  constructor(props) {
    super(props);
    this.handleSearch= this.handleSearch.bind(this);

    this.state = {
      ion: "",
      energy: "",
      facilities: [],
      errorMessage: "",
      submitted: false,
    }
  }

  async handleSearch(event) {
    event.preventDefault();
    this.setState({submitted:true});
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
        <Card style={{ justifyContent: 'center', minWidth: '50px', minHeight: '570px', width: '980px', flexGrow: '0' }}>
        <Row style={{ justifyContent: 'center', flexGrow: '0', minWidth: '50px', minHeight: '50px' }}>
          <Title>Enter ion and energy to find matching facilities</Title>
        </Row>
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
          <Row style={{ justifyContent: 'center', flexGrow: '0', minWidth: '50px', minHeight: '50px' }}>
            <Title>List of Matching Facilities</Title>
          </Row>
          <List component="nav" aria-label="Matching Facilities List">
              {this.state.facilities.map(function(facility) {
                return (
                  <div>
                  <ListItem>
                  <ListItemText primary={facility}/>
                  <Button color="primary" href={facilityLinks[facility].info}>
                    Info
                  </Button>
                  <Button color="primary" href={facilityLinks[facility].request}>
                    Request
                  </Button>
                  </ListItem>
                </div>)
              })}
          </List>
          </Card>
        </div>
          );
  }
}

export default withRouter(IonSearch);
