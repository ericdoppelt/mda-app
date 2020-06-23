import React from 'react';
import Image from '../../../components/UIzard/Image';
import Paragraph from '../../../components/UIzard/Paragraph';
import Row from '../../../components/UIzard/Row';
import Stack from '../../../components/UIzard/Stack';
import VerticalLinearStepper from '../../../components/Custom/FacilityPages/FacilityTAMU';
import MDAHeader2 from '../../../components/Custom/MDAHeader2';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  appBarSpacer: theme.mixins.toolbar
}));

export default function Home() {

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <MDAHeader2/>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Row style={{ justifyContent: 'center', minWidth: '50px', minHeight: '50px' }}>
          <Stack style={{ justifyContent: 'center', minWidth: '50px', minHeight: '50px' }}>
            <Row style={{ justifyContent: 'center', flexGrow: '0', minWidth: '50px', minHeight: '50px' }}>
              <h1>Texas A&M University Cyclotron</h1>
            </Row>
            <Stack style={{ flexGrow: '0', minWidth: '50px', minHeight: '50px' }}>
              <Row style={{ justifyContent: 'center', flexGrow: '0', minWidth: '50px', minHeight: '50px' }}>
                <Image style={{ width: '210px', height: '150px', backgroundImage: 'url(/images/1388bb77-92c9-4f33-843b-4978f4a94606.png)' }} />
              </Row>
            </Stack>
            <h2>Contact Information</h2>
              <Paragraph>
                Physical Address:
                <br/>
                <br/>
                Cyclotron Institute
                <br/>
                Texas A&M University
                <br/>
                120 Spence St.
                <br/>
                College Station, TX 77843-3366
                <br/>
                <br/>
                Mailing Address:
                <br/>
                <br/>
                Cyclotron Institute<br/>
                Texas A&M University<br/>
                3366 TAMU<br/>
                College Station, TX 77843-3366
              </Paragraph>
            <h2>Additional Documents</h2>
            <Paragraph>
              <a href="https://cyclotron.tamu.edu/ref/images/btrf.pdf" target="_blank" rel="noopener noreferrer">Beam Time Request Form (PDF)</a>
              <br/>
              <a href="https://cyclotron.tamu.edu/ref/images/btrf.docx" target="_blank" rel="noopener noreferrer">Beam Time Request Form (Word)</a>
              <br/>
              <a href="https://cyclotron.tamu.edu/ref/images/parking_map.pdf" target="_blank" rel="noopener noreferrer">Parking Map</a>
              <br/>
              <a href="https://cyclotron.tamu.edu/ref/images/ci_ref_cryo_guidelines.pdf" target="_blank" rel="noopener noreferrer">Cryogenic Safety Guidelines</a>
              <br/>
              <a href="https://cyclotron.tamu.edu/ref/images/cyclotron_entry.pdf" target="_blank" rel="noopener noreferrer">Building Entry</a>
              <br/>
              <a href="https://cyclotron.tamu.edu/ref/images/safety_form_plus_map.pdf" target="_blank" rel="noopener noreferrer">Safety Orientation</a>
              <br/>
              <a href="https://cyclotron.tamu.edu/ref/images/heavy_ion_beams.pdf" target="_blank" rel="noopener noreferrer">Heavy Ion Beam List</a>
              <br/>
              <a href="https://cyclotron.tamu.edu/ref/images/Beam_Change_Time.PDF" target="_blank" rel="noopener noreferrer">Beam Change Times</a>
              <br/>
              <a href="https://cyclotron.tamu.edu/ref/images/TAMU%20beam%20characterization%20and%20verification.pdf" target="_blank" rel="noopener noreferrer">Characterization and Verification</a>
              <br/>
              <br/>
              Facility Brochures:
              <br/>
              <a href="https://cyclotron.tamu.edu/ref/images/brochure_2019.pdf" target="_blank" rel="noopener noreferrer">Full Brochure</a>
              <br/>
              <a href="https://cyclotron.tamu.edu/ref/images/heavy_ion_brochure.pdf" target="_blank" rel="noopener noreferrer">Heavy Ion Facility Brochure</a>
              <br/>
              <a href="Proton Facility Brochure" target="_blank" rel="noopener noreferrer">Proton Facility Brochure</a>
            </Paragraph>
            <h3>Guide to Reserving Testing Time</h3>
            <VerticalLinearStepper/>
          </Stack>
        </Row>
      </main>
    </div>
  );
};
