import React from 'react';
import {TextField, Button, Box, FormControl, InputLabel, Select, MenuItem, FormHelperText, Dialog, DialogTitle, DialogContent, DialogActions} from '@material-ui/core';
import 'react-nice-dates/build/style.css'
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import { observer } from "mobx-react"
import Row from '../../../components/UIzard/Row';
import TesterStore from '../../../stores/TesterStore';

const useStyles = theme => ({
    textField: {
      width: '90%',
      marginTop: '2px',
    },
    leftTextField: {
      width: '42%',
      marginLeft: '5%',
      marginRight: '3%',
      marginTop: '1%',
    },
    rightTextField: {
      width: '42%',
      marginRight: '5%',
      marginLeft: '3%',
      marginTop: '2px',
    },
    billingAddress: {
      marginLeft: '5%',
      width: '67%',
      marginRight: '3%',
      marginTop: '2px',
    },
    poNumber: {
      marginLeft: '3%',
      width: '17%',
      marginRight: '5%',
      marginTop: '2px',
    },
    billingCity: {
      marginLeft: '5%',
      width: '29%',
      marginRight: '3%',
      marginTop: '2px',
    },
    billingState: {
      marginLeft: '3%',
      width: '29%',
      marginRight: '3%',
      marginTop: '2px',
    },
    billingZip: {
      marginLeft: '3%',
      marginRight: '5%',
      width: '20%',
      marginTop: '2px',
    }
  });

  class TesterForm extends React.Component {
    render() {
      const { classes } = this.props;
      return(
        <div>
          <Box>Please enter the following information about yourself.</Box>
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
              fullWidth
            />
            <TextField 
              className={classes.rightTextField}
              label = "Cell #"
              value = {TesterStore.cell}
              onChange={event => {TesterStore.setCell(event.target.value)}}
              error = {TesterStore.cellError}
              helperText = {TesterStore.cellHelperText}
              fullWidth
            />
            <br/>
            <br/>
            <TextField 
              className={classes.leftTextField}
              label = "Integrator"
              value = {TesterStore.integrator}
              onChange={event => {TesterStore.setIntegrator(event.target.value)}}
              error = {TesterStore.integratorError}
              helperText = {TesterStore.integratorHelperText}
              fullWidth
            />
            <TextField 
              className={classes.rightTextField}
              label = "Funding Contact"
              value = {TesterStore.financier}
              onChange={event => {TesterStore.setFinancier(event.target.value)}}
              error = {TesterStore.financierError}
              helperText = {TesterStore.financierHelperText}
              fullWidth
            />
            <TextField 
              className={classes.leftTextField}
              label = "Funding Contact Phone #"
              value = {TesterStore.financierPhone}
              onChange={event => {TesterStore.setFinancierPhone(event.target.value)}}
              error = {TesterStore.financierPhoneError}
              helperText = {TesterStore.financierPhoneHelperText}
              fullWidth
            />
            <TextField 
              className={classes.rightTextField}
              label = "Funding Contact Email"
              value = {TesterStore.financierEmail}
              onChange={event => {TesterStore.setFinancierEmail(event.target.value)}}
              error = {TesterStore.financierEmailError}
              helperText = {TesterStore.financierEmailHelperText}
              fullWidth
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
              fullWidth
            />
            <TextField 
              className={classes.poNumber}
              label = "P.O. No."
              value = {TesterStore.billingPO}
              onChange={event => {TesterStore.setBillingPO(event.target.value)}}
              fullWidth
            />
            <TextField 
              className={classes.billingCity}
              label = "City"
              value = {TesterStore.billingCity}
              onChange={event => {TesterStore.setBillingCity(event.target.value)}}
              error = {TesterStore.billingCityError}
              helperText = {TesterStore.billingCityHelperText}
              fullWidth
            />
            <TextField 
              className={classes.billingState}
              label = "State"
              value = {TesterStore.billingState}
              onChange={event => {TesterStore.setBillingState(event.target.value)}}
              error = {TesterStore.billingStateError}
              helperText = {TesterStore.billingStateHelperText}
              fullWidth
            />
            <TextField 
              className={classes.billingZip}
              label = "Zip"
              value = {TesterStore.billingZip}
              onChange={event => {TesterStore.setBillingZip(event.target.value)}}
              error = {TesterStore.billingZipError}
              helperText = {TesterStore.billingZipHelperText}
              fullWidth
            />
            <br/>
            <br/>
        </div>
      );
    }
  }

  export default withRouter(withStyles(useStyles)(observer(TesterForm)));