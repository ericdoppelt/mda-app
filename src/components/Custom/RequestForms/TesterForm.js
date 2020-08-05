import React from 'react';
import {TextField, Typography, Divider} from '@material-ui/core';
import 'react-nice-dates/build/style.css'
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import { observer } from "mobx-react"
import TesterStore from '../../../stores/TesterStore';
import axios from 'axios';

const useStyles = theme => ({
    leftTextField: {
      marginLeft: '5%',
      marginRight: '3%',
      marginTop: '2px',
      width: '42%',
    },
    rightTextField: {
      marginLeft: '3%',
      marginRight: '5%',
      marginTop: '2px',
      width: '42%',
    },
    billingAddress: {
      marginLeft: '5%',
      marginRight: '3%',
      marginTop: '2px',
      width: '62%',
    },
    poNumber: {
      marginLeft: '3%',
      marginRight: '5%',
      marginTop: '2px',
      width: '22%',
    },
    billingCity: {
      marginLeft: '5%',
      marginRight: '3%',
      marginTop: '2px',
      width: '29%',
    },
    billingState: {
      marginLeft: '3%',
      marginRight: '3%',
      marginTop: '2px',
      width: '27%',
    },
    billingZip: {
      marginLeft: '3%',
      marginRight: '5%',
      marginTop: '2px',
      width: '22%',
    }
  });

  class TesterForm extends React.Component {

    constructor(props){
      super(props);
      TesterStore.clear();
    }

    async componentDidMount() {
      let url = 'https://mda-phoenix.herokuapp.com/user';
      await axios.get(url, {
        headers: { Authorization: `Bearer ${window.sessionStorage.getItem("access_token")}` }
      }).then(response => {
        TesterStore.setIntegrator(response.data.affiliation);
      }).catch(error => {
      alert(error);
      });
    }

    render() {
      const { classes } = this.props;
      return(
        <div>
          <br/>
          <Divider/>
          <br/>
          <Typography variant='subtitle1'>Please enter the following information about yourself.</Typography>
            <TextField
              className={classes.leftTextField}
              label = "Name"
              value = {TesterStore.senderName}
              onChange={(event) => {TesterStore.setName(event.target.value)}}
              error = {TesterStore.nameError}
              helperText = {TesterStore.nameHelperText}
            />
            <TextField 
              className={classes.rightTextField}
              label = "Company"
              value = {TesterStore.company}
              onChange={event => {TesterStore.setCompany(event.target.value)}}
              error = {TesterStore.companyError}
              helperText = {TesterStore.companyHelperText}
            />
            <TextField 
              className={classes.leftTextField}
              label = "Email"
              value = {TesterStore.email}
              onChange={event => {TesterStore.setEmail(event.target.value)}}
              error = {TesterStore.emailError}
              helperText = {TesterStore.emailHelperText}
            />
            <TextField 
              className={classes.rightTextField}
              label = "Phone"
              value = {TesterStore.phone}
              onChange={event => {TesterStore.setPhone(event.target.value)}}
              error = {TesterStore.phoneError}
              helperText = {TesterStore.phoneHelperText}
            />
            <br/>
            <br/>
            <TextField 
              className={classes.leftTextField}
              label = "Integrator"
              value = {TesterStore.integrator}
              error = {TesterStore.integratorError}
              helperText = {TesterStore.integratorHelperText}
              InputProps={{
                readOnly: true
              }}
            />
            <TextField 
              className={classes.rightTextField}
              label = "Funding Contact"
              value = {TesterStore.financier}
              onChange={event => {TesterStore.setFinancier(event.target.value)}}
              error = {TesterStore.financierError}
              helperText = {TesterStore.financierHelperText}
            />
            <TextField 
              className={classes.leftTextField}
              label = "Funding Contact Phone"
              value = {TesterStore.financierPhone}
              onChange={event => {TesterStore.setFinancierPhone(event.target.value)}}
              error = {TesterStore.financierPhoneError}
              helperText = {TesterStore.financierPhoneHelperText}
            />
            <TextField 
              className={classes.rightTextField}
              label = "Funding Contact Email"
              value = {TesterStore.financierEmail}
              onChange={event => {TesterStore.setFinancierEmail(event.target.value)}}
              error = {TesterStore.financierEmailError}
              helperText = {TesterStore.financierEmailHelperText}
             
            />
            <br/>
            <br/>
            <TextField 
              className={classes.billingAddress}
              label = "Billing Address"
              value = {TesterStore.billingAddress}
              onChange={event => {TesterStore.setBillingAddress(event.target.value)}}
              error = {TesterStore.billingAddressError}
              helperText = {TesterStore.billingAddressHelperText}
            />
            <TextField 
              className={classes.poNumber}
              label = "P.O. No."
              value = {TesterStore.billingPO}
              onChange={event => {TesterStore.setBillingPO(event.target.value)}}
              type="number"
            />
            <TextField 
              className={classes.billingCity}
              label = "City"
              value = {TesterStore.billingCity}
              onChange={event => {TesterStore.setBillingCity(event.target.value)}}
              error = {TesterStore.billingCityError}
              helperText = {TesterStore.billingCityHelperText}
            />
            <TextField 
              className={classes.billingState}
              label = "State"
              value = {TesterStore.billingState}
              onChange={event => {TesterStore.setBillingState(event.target.value)}}
              error = {TesterStore.billingStateError}
              helperText = {TesterStore.billingStateHelperText}
            />
            <TextField 
              className={classes.billingZip}
              label = "Zip"
              value = {TesterStore.billingZip}
              onChange={event => {TesterStore.setBillingZip(event.target.value)}}
              error = {TesterStore.billingZipError}
              helperText = {TesterStore.billingZipHelperText}
              type = 'number'
            />
            <br/>
            <br/>
        </div>
      );
    }
  }

  export default withRouter(withStyles(useStyles)(observer(TesterForm)));