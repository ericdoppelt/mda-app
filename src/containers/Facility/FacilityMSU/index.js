import React from 'react';

import Card from '../../../components/UIzard/Card';
import Image from '../../../components/UIzard/Image';
import Main from '../../../components/UIzard/Main';
import Paragraph from '../../../components/UIzard/Paragraph';
import Row from '../../../components/UIzard/Row';
import Stack from '../../../components/UIzard/Stack';
import MDAHeader2 from '../../../components/Custom/MDAHeader2'
import VerticalLinearStepper from '../../../components/Custom/FacilityPages/FacilityMSU'
import { withStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import * as Constants from '../../../constants'

export default function FacilityNSRL() {

  const classes = Constants.useStyles();

  return (
    <ThemeProvider theme={Constants.darkTheme}>
    <div className={classes.root}>
      <MDAHeader2/>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Row style={{ justifyContent: 'center', minWidth: '50px', minHeight: '50px' }}>
          <Card style={{ justifyContent: 'center', minWidth: '50px', minHeight: '570px', flexGrow:'0'}}>
            <Row style={{ justifyContent: 'center', flexGrow: '0', minWidth: '50px', minHeight: '50px' }}>
              <h1>Michigan State NSCL</h1>
            </Row>
            <Stack style={{ flexGrow: '0', minWidth: '50px', minHeight: '50px' }}>
              <Row style={{ justifyContent: 'center', flexGrow: '0', minWidth: '50px', minHeight: '50px' }}>
                <Image style={{ width: '210px', height: '150px', backgroundImage: 'url(/images/MSULogo.png)' }} />
              </Row>
            </Stack>
            <h2>Contact Information</h2>
            <Row style={{ justifyContent: 'center', flexGrow: '0', minWidth: '50px', minHeight: '50px' }}>
            <Paragraph>
                Address:
                <br/>
                <br/>
                National Superconducting Cyclotron Laboratory
                <br/>
                Michigan State University
                <br/>
                640 South Shaw Lane
                <br/>
                East Lansing, MI 48824
                <br/>
                <br/>
                Phone: 517-355-9672
                <br/>
                <br/>
                Email: info@nscl.msu.edu
                <br/>
                <br/>
                Media Contact:
                <br/>
                Karen King, Communications Manager
                <br/>
                Email: kingk@frib.msu.edu
                <br/>
                Phone: 517-908-7262
                <br/>
                <br/>
                Events Contact:
                <br/>
                Bob Patterer, FRIB Chief of Staff
                <br/>
                Email: events@frib.msu.edu
                <br/>
                Phone: 517-908-7573
                <br/>
                <br/>
                User Relations Contact:
                <br/>
                Email: useroffice@nscl.msu.edu
                <br/>
                <br/>
                Data Acquisition Contact:
                <br/>
                Giordano Cerizza
                <br/>
                Email: cerizza@nscl.msu.edu
                <br/>
                <br/>
                Safety Office Contact:
                <br/>
                Phone: 517-908-7123
                <br/>
                Email: safety@nscl.msu.edu
                <br/>
              </Paragraph>
            </Row>
            <h2>Additional Information</h2>
            <Paragraph>
              <a href="https://www.nscl.msu.edu/about/index.html" target="_blank" rel="noopener noreferrer">About</a>
              <br/>
              <a href="https://nscl.msu.edu/users/visit.html" target="_blank" rel="noopener noreferrer">Visit Info</a>
              <br/>
              <a href="https://nscl.msu.edu/users/experimenters-responsibilities.html" target="_blank" rel="noopener noreferrer">Responsibility of Experimenters</a>
              <br/>
              <a href="https://nscl.msu.edu/exp/prep-exp/questionnaire.php" target="_blank" rel="noopener noreferrer">Questionnaire for Scheduling Experiments</a>
              <br/>
              <a href="https://nscl.msu.edu/users/resources.html" target="_blank" rel="noopener noreferrer">Schedule</a>
              <br/>
              <a href="https://nscl.msu.edu/users/beams.html" target="_blank" rel="noopener noreferrer">Available Beams</a>
              <br/>
              <a href="https://nscl.msu.edu/users/contact.html" target="_blank" rel="noopener noreferrer">Beam Contact List</a>
            </Paragraph>
            <h2>Additional Documents</h2>
            <Paragraph>
              <a href="https://nscl.msu.edu/users/Scientific_User_Disclosure_form.pdf" target="_blank" rel="noopener noreferrer">Outside User Collaboration Form</a>
              <br/>
              <a href="https://nscl.msu.edu/users/D2L%20Instructions%20for%20Non-NSCL-FRIB%20Personnel.pdf" target="_blank" rel="noopener noreferrer">Outside User Collaboration Form</a>
              <br/>
              <a href="https://nscl.msu.edu/users/ExperimenterResponsibilities.pdf" target="_blank" rel="noopener noreferrer">Responsibility of Experimenters (PDF)</a>
              <br/>
              <a href="https://nscl.msu.edu/users/ReA_PACcall_final2.pdf" target="_blank" rel="noopener noreferrer">Calls for Proposals</a>
              <br/>
              <a href="https://nscl.msu.edu/users/2019-PAC43_ReA_beam_rate_estimates_forweb.pdf" target="_blank" rel="noopener noreferrer">Radioactive Beam List (PDF)</a>
            </Paragraph>
            <h3><strong>Guide to Reserving Testing Time</strong></h3>
            <VerticalLinearStepper/>
          </Card>
        </Row>
      </main>
    </div>
    </ThemeProvider>
  );
};
