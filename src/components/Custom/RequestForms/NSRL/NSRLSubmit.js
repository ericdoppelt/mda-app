import { Button, Snackbar, Divider} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import React from 'react';
import ExperimentStore from '../../../../stores/ExpirementStore';
import NSRLStore from '../../../../stores/NSRLStore';
import TesterStore from '../../../../stores/TesterStore';
import { withRouter } from 'react-router-dom';
import {Alert} from '@material-ui/lab';

const useStyles = theme => ({
  submitButton: {
    marginTop: '20px',
    marginLeft: '5%',
    marginRight: '5%',
    marginBottom: '20px',
    width: '90%',
    height: '50px',
    },    
  fullDiv: {
    width: '100%',
    },
  });

class NSRLSubmit extends React.Component {

  constructor(props) {
      super(props);
      this.submitForm = this.submitForm.bind(this);
      this.state = {
        submitFailed: false,
      }
    }

  async submitForm() {
    TesterStore.setSubmitted();
    ExperimentStore.setSubmitted();
    if (TesterStore.validForm && ExperimentStore.validForm) {
      let self = this;
        let url = 'https://vcm-15941.vm.duke.edu/api/requestform';
        await axios.post(url, {
          name: TesterStore.senderName,
          email: TesterStore.email,
          cell: TesterStore.phone,
          company: TesterStore.company,
          integrator: TesterStore.integrator,
          financierName: TesterStore.financier,
          financierPhone: TesterStore.financierPhone,
          financierEmail: TesterStore.financierEmail,
          billingAddress: TesterStore.billingAddress,
          billingPO: TesterStore.billingPO,
          billingCity: TesterStore.billingCity,
          billingState: TesterStore.billingState,
          billingZip: TesterStore.billingZip,

          title: ExperimentStore.title,
          personnel: ExperimentStore.personnel,
          date: ExperimentStore.startDate,
          ions: ExperimentStore.ions,
          energies: ExperimentStore.energies,
          shifts: ExperimentStore.shifts,
          hoursOn: ExperimentStore.hoursOn,
          hoursOff: ExperimentStore.hoursOff,
          comments: ExperimentStore.comments,

          endDate: NSRLStore.endDate,
          experimentType: NSRLStore.experimentType,
          isNasa: NSRLStore.isNasa,
          let: NSRLStore.let,
          beamSize: NSRLStore.beamSize,
          maxDose: NSRLStore.maxDose,
    
          facility: "NSRL"},
          {headers: {Authorization: `Bearer ${window.sessionStorage.getItem("access_token")}`}
          }).then(response => {
            if (response.data.success === true) {
            alert("Form was sent to NSRL successfully. Please check your email!")
              self.props.history.push({
                pathname: "/view-requests",
                state: {formSubmitted: true}
              });
            } else {
              alert(response.data.msg);
              } 
            })
            .catch(error => {
              alert(error);
          });
        } else {
          this.setState({submitFailed: true});
        }
  }

  getSnackBar() {
    console.log("called");
    console.log(this.state.submitFailed);
    if (this.state.submitFailed) {
      return(
        <Snackbar 
            anchorOrigin={{vertical: 'top',horizontal: 'center'}}
            open={this.state.submitFailed} 
            autoHideDuration={6000} 
            onClose={() => this.setState({submitFailed: false})}
          >
            <Alert severity="error">
              The form was not submitted. Please fill in the required fields.
            </Alert>
        </Snackbar>
      );
    }
  }
  
  render() {
    const { classes } = this.props;
    return(
      <div className={classes.fullDiv}>
      <br/>
      <Divider />
      <Button color='primary' variant = 'contained' className={classes.submitButton} onClick={this.submitForm}>
        Submit to Integrator
      </Button>

      {this.getSnackBar()}

      </div>
    );
  }
}

export default withRouter(withStyles(useStyles)(NSRLSubmit));