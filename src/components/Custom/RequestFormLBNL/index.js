import React from 'react';
import {TextField, Button, Box, FormControl, InputLabel, Select, MenuItem, FormHelperText, Dialog, DialogTitle, DialogContent, DialogActions} from '@material-ui/core';
import 'react-nice-dates/build/style.css'
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import Stack from '../../UIzard/Stack';
import './RequestFormLBNL.css'
import axios from 'axios';
import InfiniteCalendar, {Calendar, withMultipleDates, defaultMultipleDateInterpolation} from 'react-infinite-calendar';
import Image from '../../../components/UIzard/Image';
import 'fontsource-roboto';
import SendIcon from '@material-ui/icons/Send';
import LBNLStore from '../../../stores/LBNLStore';
import { observer } from "mobx-react"

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

class RequestFormLBNL extends React.Component {

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.openStartDatePicker = this.openStartDatePicker.bind(this);
    this.closeStartDatePicker = this.closeStartDatePicker.bind(this);
    this.openAltStartDatePicker = this.openAltStartDatePicker.bind(this);
    this.closeAltStartDatePicker = this.closeAltStartDatePicker.bind(this);
      
  }

  async getBeamInfo() {
    
  }

  openStartDatePicker() {
    this.setState({openStartDate: true});
  }

  closeStartDatePicker() {
    this.setState({openStartDate: false});
  }

  openAltStartDatePicker() {
    console.log("called");
    this.setState({openAltStartDate: true});
  }

  closeAltStartDatePicker() {
    this.setState({openAltStartDate: false});
  }

  async handleSubmit() {
    this.setState({submitted: true});
    this.state.submitted = true;
    this.validateForm();

    if (this.state.validForm === true) {
    let url = 'https://mda-phoenix.herokuapp.com/requestform';
    await axios.post(url, {
      investigatorName: this.state.investigatorName,
      investigatorOrg: this.state.investigatorOrg,
      senderEmail: this.state.senderEmail,
      investigatorAddress: this.state.investigatorAddress,
      investigatorOfficePhone: this.state.investigatorOfficePhone,
      investigatorCell: this.state.investigatorCell,

      financierName: this.state.financierName,
      financierEmail: this.state.financierEmail,
      financierTelephone: this.state.financierTelephone,

      experimentTitle: this.state.experimentTitle,
      experimentAbstract: this.state.experimentAbstract,
      desiredStartDate: this.state.desiredStartDate,
      alternateStartDate: this.state.alternateStartDate,
      totalHours: this.state.totalHours,
      targetMaterials: this.state.targetMaterials,
      fundingSource: this.state.fundingSource,
      safetyConcerns: this.state.safetyConcerns,

      beamType: this.state.beamType,
      specialIons: this.state.specialIons,
      desiredEnergy: this.state.desiredEnergy,
      desiredIntensity: this.state.desiredIntensity,

      airOrVacuum: this.state.airOrVacuum,
      controlRestrictions: this.state.controlRestrictions,
      electricallySafe: this.state.electricallySafe,
      personnel: this.state.personnel,

      facility: "LBNL",
      comments: this.state.comments,
      }).then(response => {
        if (response.data.success === true) {
        alert("Form was sent to LBNL successfully. Please check your email!")
          this.props.history.push({
            pathname: "/"
          });
        } else {
          alert(response.data.msg);
          } 
        })
        .catch(error => {
          alert(error);
      });
    } else {
      alert("not sent");
      console.log(this.state);
    }
  }


  validateForm() {
    let formIsValid = true;
    if (this.state.investigatorName === "") {
      this.state.investigatorNameErrorText = "Please enter a name.";
      formIsValid = false;
    }
    else this.state.companyNameErrorText = "";

    if (this.state.investigatorOrg === "") {
      this.state.investigatorOrgErrorText = "Please enter an organization.";
      formIsValid = false;
    }
    else this.state.investigatorOrgErrorText = "";

    if (this.state.senderEmail === "") {
      this.state.senderEmailErrorText = "Please enter an email.";
      formIsValid = false;
    }
    else this.state.senderEmailErrorText = "";

    if (this.state.investigatorAddress === "") {
      this.state.investigatorAddressErrorText = "Please enter an address.";
      formIsValid = false;
    }
    else this.state.billingCityErrorText = "";

    if (this.state.investigatorOfficePhone === "") {
      this.state.investigatorOfficePhoneErrorText = "Please enter a phone nuumber.";
      formIsValid = false;
    }
    else this.state.investigatorOfficePhoneErrorText = "";

    if (this.state.investigatorCell === "") {
      this.state.investigatorCellErrorText = "Please enter a number.";
      formIsValid = false;
    }
    else this.state.investigatorCellErrorText = "";

    if (this.state.financierName === "") {
      this.state.financierNameErrorText = "Please enter the name for a financier.";
      formIsValid = false;
    }
    else this.state.financierNameErrorText = "";

    if (this.state.financierEmail === "") {
      this.state.financierEmailErrorText = "Please enter the email for a financier.";
      formIsValid = false;
    }
    else this.state.financierEmailErrorText = "";

    if (this.state.financierTelephone === "") {
      this.state.financierTelephoneErrorText = "Please enter the phone number for a financier.";
      formIsValid = false;
    }
    else this.state.financierTelephoneErrorText = "";

    if (this.state.experimentTitle === "") {
      this.state.experimentTitleErrorText = "Please enter an experiment title.";
      formIsValid = false;
    }
    else this.state.experimentTitleErrorText = "";

    if (this.state.experimentAbstract === "") {
      this.state.experimentAbstractErrorText = "Please enter an experiment abstract.";
      formIsValid = false;
    }
    else this.state.experimentAbstractErrorText = "";

    if (this.state.desiredStartDate === "") {
      this.state.desiredStartDateErrorText = "Please enter a desired start date.";
      formIsValid = false;
    }
    else this.state.desiredStartDateErrorText = "";

    if (this.state.alternateStartDate === "") {
      this.state.alternateStartDateErrorText = "Please enter an alternative start date.";
      formIsValid = false;
    }
    else this.state.alternateStartDateErrorText = "";
    
    if (this.state.totalHours === "") {
      this.state.totalHoursErrorText = "Please enter the number of hours for the experiment.";
      formIsValid = false;
    }
    else this.state.totalHoursErrorText = "";
    
    if (this.state.targetMaterials === "") {
      this.state.targetMaterialsErrorText = "Please enter the experiment's target materials and thickness."
      formIsValid = false;
    }
    else this.state.targetMaterialsErrorText = "";

    if (this.state.fundingSource === "") {
      this.state.fundingSourceErrorText = "Please enter a funding source.";
      formIsValid = false;
    }
    else this.state.fundingSourceErrorText = "";
    
    if (this.state.safetyConcerns === "") {
      this.state.safetyConcernsErrorText = "Please enter safety concerns for the experiment.";
      formIsValid = false;
    }
    else this.state.safetyConcernsErrorText = "";

    if (this.state.beamType === "") {
      this.state.beamTypeErrorText = "Please enter the desired beam's for this experiment."
      formIsValid = false;
    }
    else this.state.beamTypeErrorText = "";

    if (this.state.specialIons == "") {
      this.state.specialIonsErrorText = "Please enter the desired special ions for the experiment."
      formIsValid = false;
    }
    else this.state.specialIonsErrorText = "";
    
    if (this.state.desiredEnergy === "") {
      this.state.desiredEnergyErrorText = "Please enter the desired energy for the experiment."
      formIsValid = false;
    }
    else this.state.desiredEnergyErrorText = "";

    if (this.state.desiredIntensity === "") {
      this.state.desiredIntensityErrorText = "Please enter the desired intensity & flux for the experiment."
      formIsValid = false;
    }
    else this.state.desiredIntensityErrorText = "";
    
    if (this.state.airOrVacuum === "") {
      this.state.airOrVacuumErrorText = "Please enter whether the experiment will be in the air or a vacuum."
      formIsValid = false;
    }
    else this.state.airOrVacuumErrorText = "";

    if (this.state.controlRestrictions === "") {
      this.state.controlRestrictionsErrorText = "Please enter whether the experiment will have export control restrictions or not."
      formIsValid = false;
    }
    else this.state.controlRestrictionsErrorText = "";

    if (this.state.electricallySafe === "") {
      this.state.electricallySafeErrorText = "Please enter whether the equipment is electrically safe or not."
      formIsValid = false;
    }
    else this.state.electricallySafeErrorText = "";

    if (this.state.personnel === "") {
      this.state.personnelErrorText = "Please enter the names of all personnel involved."
      formIsValid = false;
    }
    else this.state.personnelErrorText = "";

    this.setState({validForm: formIsValid});
    this.state.validForm = formIsValid;
  }
  

  render() {
    const { classes } = this.props;
    return (
    <div className="fullForm">
      <Stack>
        <Image style={{ width: '210px', height: '150px', backgroundImage: 'url(/images/LBNLLogo.jpg)' }} />
        <h1 variant="h1" component="h2">Lawrence Berkley National Lab Beam Request Form</h1>
        <Box>Please enter the following information.</Box>
        <TextField
          className={classes.textField}
          label = "Principal Investigator Name"
          value = {LBNLStore.senderName}
          onChange={(event) => {LBNLStore.setSenderName(event.target.value)}}
          error = {LBNLStore.senderNameError}
          helperText = {LBNLStore.senderNameHelperText}
          fullWidth
          />
        <TextField 
          className={classes.textField}
          label = "Principal Investigator Organization"
          value = {LBNLStore.senderCompany}
          onChange={event => {LBNLStore.setSenderCompany(event.target.value)}}
          error = {LBNLStore.senderOrgError}
          helperText = {LBNLStore.senderOrgHelperText}
          fullWidth
          />
        <TextField 
          className={classes.textField}
          label = "Principal Investigator E-mail"
          value = {LBNLStore.senderEmail}
          onChange={event => {LBNLStore.setSenderEmail(event.target.value)}}
          error = {LBNLStore.senderEmailError}
          helperText = {LBNLStore.senderEmailHelperText}
          fullWidth
          />
        <TextField 
          className={classes.textField}
          label = "Principal Investigator Address"
          vaue = {LBNLStore.senderAddress}
          onChange={event => {LBNLStore.setSenderAddress(event.target.value)}}
          error = {LBNLStore.senderAddressError}
          helperText = {LBNLStore.senderAddressHelperText}
          fullWidth
          />
        <TextField 
          className={classes.textField}
          label = "Principal Investigator Office Phone"
          value = {LBNLStore.senderOfficePhone}
          onChange={event => {LBNLStore.setSenderOfficePhone(event.target.value)}}
          error = {LBNLStore.senderOfficePhoneError}
          helperText = {LBNLStore.senderOfficePhoneHelperText}
          fullWidth
          />
        <TextField 
          className={classes.textField}
          label = "Principal Investigator Cell Phone During Experiment"
          value = {LBNLStore.senderCell}
          onChange={event => {LBNLStore.setSenderCell(event.target.value)}}
          error = {LBNLStore.senderCellError}
          helperText = {LBNLStore.senderCellHelperText}
          fullWidth
          />
          <TextField 
          className={classes.textField}
          label = "Contract/Financial Point of Contact Name"
          onChange={event => {this.setState({financierName: event.target.value})}}
          error = {this.state.financierNameErrorText !== "" && this.state.submitted}
          helperText = {this.state.financierNameErrorText}
          fullWidth
          />
        <TextField 
          className={classes.textField}
          label = "Contract/Financial Point of Contact E-mail"
          onChange={event => {this.setState({financierEmail: event.target.value})}}
          error = {this.state.financierEmailErrorText !== "" && this.state.submitted}
          helperText = {this.state.financierEmailErrorText}
          fullWidth
          />
        <TextField 
          className={classes.textField}
          label = "Contract/Financial Point of Contact Telephone"
          onChange={event => {this.setState({financierTelephone: event.target.value})}}
          error = {this.state.financierTelephoneErrorText !== "" && this.state.submitted}
          helperText = {this.state.financierTelephoneErrorText}
          fullWidth
          />
        <TextField 
          className={classes.textField}
          label = "Title of Experiment/Proposal"
          onChange={event => {this.setState({experimentTitle: event.target.value})}}
          error = {this.state.experimentTitleErrorText !== "" && this.state.submitted}
          helperText = {this.state.experimentTitleErrorText}
          fullWidth
          />
        <TextField 
          className={classes.textField}
          label = "Abstract of Experiment/Proposal"
          onChange={event => {this.setState({experimentAbstract: event.target.value})}}
          error = {this.state.experimentAbstractErrorText !== "" && this.state.submitted}
          helperText = {this.state.experimentAbstractErrorText}
          fullWidth
          />
        <TextField 
          className={classes.textField}
          label = "Total Tune & Run Hours Needed"
          onChange={event => {this.setState({totalHours: event.target.value})}}
          error = {this.state.totalHoursErrorText !== "" && this.state.submitted}
          helperText = {this.state.totalHoursErrorText}
          type="Number"
          fullWidth
          />
        <TextField 
          className={classes.textField}
          label = "Target Material(s) and Thickness"
          onChange={event => {this.setState({targetMaterials: event.target.value})}}
          error = {this.state.targetMaterialsErrorText !== "" && this.state.submitted}
          helperText = {this.state.targetMaterialsErrorText}
          fullWidth
          multiline
          />
        <TextField 
          className={classes.textField}
          label = "Funding Source"
          onChange={event => {this.setState({fundingSource: event.target.value})}}
          error = {this.state.fundingSourceErrorText !== "" && this.state.submitted}
          helperText = {this.state.fundingSourceErrorText}
          fullWidth
          />
        <TextField 
          className={classes.textField}
          label = "Potential Safety Concerns"
          onChange={event => {this.setState({safetyConcerns: event.target.value})}}
          error = {this.state.safetyConcernsErrorText !== "" && this.state.submitted}
          helperText = {this.state.safetyConcernsErrorText}
          fullWidth
          multiline
          />
        <TextField 
          className={classes.textField}
          label = "Type of Beam Desired"
          onChange={event => {this.setState({beamType: event.target.value})}}
          error = {this.state.beamTypeErrorText !== "" && this.state.submitted}
          helperText = {this.state.beamTypeErrorText}
          fullWidth
          multiline
          />
          <TextField 
          className={classes.textField}
          label = "Special Request Ions"
          onChange={event => {this.setState({specialIons: event.target.value})}}
          error = {this.state.specialIonsErrorText !== "" && this.state.submitted}
          helperText = {this.state.specialIonsErrorText}
          fullWidth
          multiline
          />
        <TextField 
          className={classes.textField}
          label = "Desired Energy"
          onChange={event => {this.setState({desiredEnergy: event.target.value})}}
          error = {this.state.desiredEnergyErrorText !== "" && this.state.submitted}
          helperText = {this.state.desiredEnergyErrorTexts}
          fullWidth
          multiline
          />
        <TextField 
          className={classes.textField}
          label = "Desired Intensity/Flux"
          onChange={event => {this.setState({desiredIntensity: event.target.value})}}
          error = {this.state.desiredIntensityErrorText !== "" && this.state.submitted}
          helperText = {this.state.desiredIntensityErrorText}
          fullWidth
          multiline
          />
        <FormControl 
          className={classes.textField}
          error = {this.state.airOrVacuumErrorText !== "" && this.state.submitted}
          fullWidth
          > 
          <InputLabel>Will the run be conducted in air or vacuum?</InputLabel>
          <Select
            value={this.state.airOrVacuum}
            onChange={event => {this.setState({airOrVacuum: event.target.value})}}
            >
              <MenuItem value={"Air"}>Air</MenuItem>
              <MenuItem value={"Vacuum"}>Vacuum</MenuItem>
          </Select>
          <FormHelperText>{this.state.airOrVacuumErrorText}</FormHelperText>
        </FormControl>
        <TextField 
          className={classes.textField}
          label = "Does this work have export control restrictions?"
          onChange={event => {this.setState({controlRestrictions: event.target.value})}}
          error = {this.state.controlRestrictionsErrorText !== "" && this.state.submitted}
          helperText = {this.state.controlRestrictionsErrorText}
          fullWidth
          />
        <FormControl 
          className={classes.textField}
          error = {this.state.electricallySafeErrorText !== "" && this.state.submitted}
          fullWidth
          > 
          <InputLabel>Are all electrical/electronic equipment that will be used onsite electrically safe?</InputLabel>
          <Select
            value={this.state.electricallySafe}
            onChange={event => {this.setState({electricallySafe: event.target.value})}}
            >
              <MenuItem value={"Yes"}>Yes</MenuItem>
              <MenuItem value={"No"}>No</MenuItem>
          </Select>
          <FormHelperText>{this.state.electricallySafeErrorText}</FormHelperText>
        </FormControl>
        <TextField 
          className={classes.textField}
          label = "Names of all personnel participating in the experiment"
          onChange={event => {this.setState({personnel: event.target.value})}}
          error = {this.state.personnelErrorText !== "" && this.state.submitted}
          helperText = {this.state.personnelErrorText}
          fullWidth
          multiline
          />
        <TextField 
          className={classes.textField}
          label = "Comments"
          onChange={event => {this.setState({comments: event.target.value})}}
          fullWidth
          multiline
          />
        <br/>

        <Button className={classes.startButton} onClick={this.openStartDatePicker}>
          Select Start Date
        </Button>
        <Dialog open={this.state.openStartDate} onClose={this.closeStartDatePicker}>
          <DialogTitle>Please enter a desired start date.</DialogTitle>
          <DialogContent>
            <InfiniteCalendar
              selected={this.state.desiredStartDate}
              onSelect={(event) => this.setState({desiredStartDate: event})}
              minDate={new Date()}
              min={new Date()}
            />
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={this.closeStartDatePicker}>
              Select Start Date
            </Button>
          </DialogActions>
        </Dialog>

        <Button className={classes.alternateButton} onClick={this.openAltStartDatePicker}>Select Alternate Start Date</Button>
        <Dialog open={this.state.openAltStartDate} onClose={this.closeAltStartDatePicker}>
          <DialogTitle>Please enter an alternate start date.</DialogTitle>
          <DialogContent>
            <InfiniteCalendar
              selected={this.state.alternateStartDate}
              onSelect={(event) => this.setState({alternateStartDate: event})}
              minDate={new Date()}
              min={new Date()}
            />
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={this.closeAltStartDatePicker}>
              Select Alternate Start Date
            </Button>
          </DialogActions>
        </Dialog>
        <Button className={classes.submitButton} onClick={() => LBNLStore.setSubmitted(true)} variant='contained'>
          Submit  
          <SendIcon/>
        </Button>
      </Stack>
    </div>
    );
  }
}

export default withRouter(withStyles(useStyles)(observer(RequestFormLBNL)));