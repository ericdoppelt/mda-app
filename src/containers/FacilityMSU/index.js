import React from 'react';

import Card from '../../components/Card';
import Image from '../../components/Image';
import Main from '../../components/Main';
import MDAHeader from '../../components/MDAHeader';
import Paragraph from '../../components/Paragraph';
import Row from '../../components/Row';
import Stack from '../../components/Stack';

export default () => (
  <Main style={{ justifyContent: 'flex-start', alignItems: 'center' }}>
    <MDAHeader/>
    <Row style={{ justifyContent: 'center', minWidth: '50px', minHeight: '50px' }}>
      <Card style={{ justifyContent: 'center', minWidth: '50px', minHeight: '570px', width: '720px', flexGrow: '0' }}>
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
          <a href="https://www.nscl.msu.edu/about/index.html" target="_blank">About</a>
          <br/>
          <a href="https://nscl.msu.edu/users/visit.html" target="_blank">Visit Info</a>
          <br/>
          <a href="https://nscl.msu.edu/users/experimenters-responsibilities.html" target="_blank">Responsibility of Experimenters</a>
          <br/>
          <a href="https://nscl.msu.edu/exp/prep-exp/questionnaire.php" target="_blank">Questionnaire for Scheduling Experiments</a>
          <br/>
          <a href="https://nscl.msu.edu/users/resources.html" target="_blank">Schedule</a>
          <br/>
          <a href="https://nscl.msu.edu/users/beams.html" target="_blank">Available Beams</a>
          <br/>
          <a href="https://nscl.msu.edu/users/contact.html" target="_blank">Beam Contact List</a>
        </Paragraph>
        <h2>Additional Documents</h2>
        <Paragraph>
          <a href="https://nscl.msu.edu/users/Scientific_User_Disclosure_form.pdf" target="_blank">Outside User Collaboration Form</a>
          <br/>
          <a href="https://nscl.msu.edu/users/D2L%20Instructions%20for%20Non-NSCL-FRIB%20Personnel.pdf" target="_blank">Outside User Collaboration Form</a>
          <br/>
          <a href="https://nscl.msu.edu/users/ExperimenterResponsibilities.pdf" target="_blank">Responsibility of Experimenters (PDF)</a>
          <br/>
          <a href="https://nscl.msu.edu/users/ReA_PACcall_final2.pdf" target="_blank">Calls for Proposals</a>
          <br/>
          <a href="https://nscl.msu.edu/users/2019-PAC43_ReA_beam_rate_estimates_forweb.pdf" target="_blank">Radioactive Beam List (PDF)</a> 
        </Paragraph>
      </Card>
    </Row>
  </Main>
);