import React from 'react';
import Typography from "@material-ui/core/Typography";
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Image from '../../../UIzard/Image';
import Stack from '../../../UIzard/Stack';
import Subheader from '../../../UIzard/Subheader';
import UserInfo from '../../UserInfo';
import axios from 'axios';
import { observer } from "mobx-react"
import { observable } from "mobx"
import UserProfileStore from '../../../../stores/UserProfileStore';
import UserProfile from '../../UserProfile';
import TodoList from '../TodoList/todoList';




class UsertodoList extends React.Component {

      constructor(props) {
        super(props);



      this.state = {
        name: "",
        username: "",
        affiliation: "",
        userType: "",
        phone: "",
        email: "",
        sampText: UserProfileStore.sampText,
      }
    }


    async componentDidMount() {
      var self = this;

      let url = "https://mda-phoenix.herokuapp.com/user";
      await axios.post(url, null, {
        headers: { Authorization: `Bearer ${window.sessionStorage.getItem("access_token")}` }
        }).then(response => {
        //console.log(response);
        self.setState({
          name: response.data.first_name + " " + response.data.last_name,
          username: response.data.user,
          affiliation: response.data.affiliation,
          userType: response.data.user_type,
          phone: response.data.phone,
          email: response.data.email,
        });
        })
        .catch(error => {
          console.log("error");
          console.log(error);
      });
    }

      render () {
        return (
          <TodoList/>
      )}

    }

export default observer(UsertodoList);
