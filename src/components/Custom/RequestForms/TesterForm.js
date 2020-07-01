import React from 'react';
import {TextField, Button, Box, FormControl, InputLabel, Select, MenuItem, FormHelperText, Dialog, DialogTitle, DialogContent, DialogActions} from '@material-ui/core';
import 'react-nice-dates/build/style.css'
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import { observer } from "mobx-react"

import TesterStore from '../../../stores/TesterStore';

const useStyles = theme => ({
    submitButton: {
      backgroundColor: "#bfddff",
      width: '100%',
    },
    startButton: {
      backgroundColor: "#bfffc8",
      width: '100%',
      marginTop: '20px',
      marginBottom: '10px',
    },
    alternateButton: {
      backgroundColor: "#f5f5b8",
      width: '100%',
      marginBottom: '30px',
    },
    textField: {
      marginBottom: '2px',
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
              className={classes.textField}
              label = "Name"
              value = {TesterStore.senderName}
              onChange={(event) => {TesterStore.setName(event.target.value)}}
              error = {TesterStore.nameError}
              helperText = {TesterStore.nameHelperText}
              fullWidth
            />
            <TextField 
              className={classes.textField}
              label = "Email"
              value = {TesterStore.email}
              onChange={event => {TesterStore.setEmail(event.target.value)}}
              error = {TesterStore.emailError}
              helperText = {TesterStore.emailHelperText}
              fullWidth
            />
            <TextField 
              className={classes.textField}
              label = "Cell #"
              value = {TesterStore.cell}
              onChange={event => {TesterStore.setCell(event.target.value)}}
              error = {TesterStore.cellError}
              helperText = {TesterStore.cellHelperText}
              fullWidth
            />
            <TextField 
              className={classes.textField}
              label = "Company"
              value = {TesterStore.company}
              onChange={event => {TesterStore.setCompany(event.target.value)}}
              error = {TesterStore.companyError}
              helperText = {TesterStore.companyHelperText}
              fullWidth
            />
            <TextField 
              className={classes.textField}
              label = "Integrator"
              value = {TesterStore.integrator}
              onChange={event => {TesterStore.setIntegrator(event.target.value)}}
              error = {TesterStore.integratorError}
              helperText = {TesterStore.integratorHelperText}
              fullWidth
            />
            <TextField 
              className={classes.textField}
              label = "Funding Contact"
              value = {TesterStore.financier}
              onChange={event => {TesterStore.setFinancier(event.target.value)}}
              error = {TesterStore.financierError}
              helperText = {TesterStore.financierHelperText}
              fullWidth
            />
            <TextField 
              className={classes.textField}
              label = "Funding Contact's Phone #"
              value = {TesterStore.financierPhone}
              onChange={event => {TesterStore.setFinancierPhone(event.target.value)}}
              error = {TesterStore.financierPhoneError}
              helperText = {TesterStore.financierPhoneHelperText}
              fullWidth
            />
            <TextField 
              className={classes.textField}
              label = "Funding Contact's Email"
              value = {TesterStore.financierEmail}
              onChange={event => {TesterStore.setFinancierEmail(event.target.value)}}
              error = {TesterStore.financierEmailError}
              helperText = {TesterStore.financierEmailHelperText}
              fullWidth
            />
            <TextField 
              className={classes.textField}
              label = "Billing Address"
              value = {TesterStore.billingAddress}
              onChange={event => {TesterStore.setBillingAddress(event.target.value)}}
              error = {TesterStore.billingAddressError}
              helperText = {TesterStore.billingAddressHelperText}
              fullWidth
            />
            <TextField 
              className={classes.textField}
              label = "P.O. No."
              value = {TesterStore.billingPO}
              onChange={event => {TesterStore.setBillingPO(event.target.value)}}
              fullWidth
            />
            <TextField 
              className={classes.textField}
              label = "Billing Address City"
              value = {TesterStore.billingCity}
              onChange={event => {TesterStore.setBillingCity(event.target.value)}}
              error = {TesterStore.billingCityError}
              helperText = {TesterStore.billingCityHelperText}
              fullWidth
            />
            <TextField 
              className={classes.textField}
              label = "Billing Address State"
              value = {TesterStore.billingState}
              onChange={event => {TesterStore.setBillingState(event.target.value)}}
              error = {TesterStore.billingStateError}
              helperText = {TesterStore.billingStateHelperText}
              fullWidth
            />
            <TextField 
              className={classes.textField}
              label = "Billing Address Zip"
              value = {TesterStore.billingZip}
              onChange={event => {TesterStore.setBillingZip(event.target.value)}}
              error = {TesterStore.billingZipError}
              helperText = {TesterStore.billingZipHelperText}
              fullWidth
            />
        </div>
      );
    }
  }

  export default withRouter(withStyles(useStyles)(observer(TesterForm)));