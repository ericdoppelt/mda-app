import React from 'react';
import {Button} from '@material-ui/core';
import TAMUStore from '../../../../stores/TAMUStore';
import ExperimentStore from '../../../../stores/ExpirementStore';
import TesterStore from '../../../../stores/TesterStore';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';

const useStyles = theme => ({
    submitButton: {
      backgroundColor: "#bfddff",
      marginTop: '15px',
      marginLeft: '5%',
      marginRight: '5%',
      width: '90%',
      },    
      
      fullDiv: {
        width: '100%',
     }
  });

class TAMUSubmit extends React.Component {

  constructor(props) {
      super(props);
      this.submitForm = this.submitForm.bind(this);
    }

  async submitForm() {
    TesterStore.setSubmitted();
    ExperimentStore.setSubmitted();
    if (TesterStore.validForm && ExperimentStore.validForm) {
        let url = 'https://mda-phoenix.herokuapp.com/requestform';
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
          hours: ExperimentStore.hours,
          continuous: ExperimentStore.continuous,
          comments: ExperimentStore.comments,

          badDates: TAMUStore.badDates,
    
          facility: "TAMU"},
          {headers: {Authorization: `Bearer ${window.sessionStorage.getItem("access_token")}`}
          }).then(response => {
            if (response.data.success === true) {
            alert("Form was sent to TAMU successfully. Please check your email!")
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
          alert("The form was not sent. Please fill out all required fields.");
        }
  }
  
  render() {
    const { classes } = this.props;
    return(
      <div className={classes.fullDiv}>
      <br/>
      <Button className={classes.submitButton} onClick={this.submitForm}>
        Submit to Integrator
      </Button>

      {/*
      <Button className={classes.submitButton} onClick={this.submitForm}>
        Email Form to Facility
      </Button> */}
      </div>
    );
  }
}

export default withStyles(useStyles)(TAMUSubmit);