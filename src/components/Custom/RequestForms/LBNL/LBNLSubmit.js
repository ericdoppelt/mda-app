import React from 'react';
import {Button} from '@material-ui/core';
import LBNLStore from '../../../../stores/LBNLStore';
import ExperimentStore from '../../../../stores/ExpirementStore';
import TesterStore from '../../../../stores/TesterStore';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';

const useStyles = theme => ({
    submitButton: {
      backgroundColor: "#bfddff",
      width: '100%',
    },
    startButton: {
      backgroundColor: "#bfffc8",
      width: '100%',
      marginTop: '20px',
      marginBottom: '20px',
    },
    alternateButton: {
      backgroundColor: "#f5f5b8",
      width: '100%',
      marginTop: '20px',
    },
    textField: {
      marginBottom: '2px',
      marginTop: '2px',
    }
  });

class LBNLSubmit extends React.Component {

  constructor(props) {
      super(props);
      this.submitForm = this.submitForm.bind(this);
    }

  async submitForm() {
    TesterStore.setSubmitted();
    ExperimentStore.setSubmitted();
    console.log(TesterStore);
    if (TesterStore.validForm && ExperimentStore.validForm) {
        let url = 'https://mda-phoenix.herokuapp.com/requestform';
        await axios.post(url, {
          name: TesterStore.senderName,
          email: TesterStore.email,
          cell: TesterStore.cell,
          company: TesterStore.company,
          integrator: TesterStore.integrator,
          financierName: TesterStore.financier,
          financierPhone: TesterStore.financierPhone,
          financierEmail: TesterStore.financierEmail,
          billingAddress: TesterStore.billingAddress,
          billingPO: TesterStore.billingPO,
          billingCity: TesterStore.billingCity,
          billingState: TesterStore.billingState,
          billilngZip: TesterStore.billingZip,

          title: ExperimentStore.title,
          hours: ExperimentStore.hours,
          personnel: ExperimentStore.personnel,
          date: ExperimentStore.startDate,
          ions: ExperimentStore.ions,
          energies: ExperimentStore.energies,
          comments: ExperimentStore.comments,

          address: LBNLStore.senderAddress,
          officePhone: LBNLStore.senderOfficePhone,
          abstract: LBNLStore.experimentAbstract,
          alternateDate: LBNLStore.alternateDate,
          targetMaterials: LBNLStore.targetMaterials,
          safetyConcerns: LBNLStore.safetyConcerns,
          beamType: LBNLStore.beamType,
          specialIons: LBNLStore.specialIons,
          specialEnergies: LBNLStore.specialEnergies,
          desiredIntensity: LBNLStore.flux,
          airOrVacuum: LBNLStore.airOrVacuum,
          controlRestrictions: LBNLStore.controlRestrictions,
          electricallySafe: LBNLStore.electricallySafe,
    
          facility: "LBNL",
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
        }
  }
  
  render() {
    const { classes } = this.props;
    return(
      <Button className={classes.submitButton} onClick={this.submitForm}>
        Submit Form
      </Button>
    );
  }
}

export default withStyles(useStyles)(LBNLSubmit);