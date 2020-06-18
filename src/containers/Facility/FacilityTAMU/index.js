import React from 'react';

//import Card from '../../../components/UIzard/Card';
import Image from '../../../components/UIzard/Image';
import Main from '../../../components/UIzard/Main';
import MDAHeader from '../../../components/Custom/MDAHeader';
import Paragraph from '../../../components/UIzard/Paragraph';
import Row from '../../../components/UIzard/Row';
import Stack from '../../../components/UIzard/Stack';

export default () => (
  <Main style={{ justifyContent: 'flex-start', alignItems: 'center' }}>
    <MDAHeader/>
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
          <Paragraph>
          <ul>
            <li><strong>Initial Steps</strong></li>
            <ul>
              <li> <a href="https://cyclotron.tamu.edu/" target="_blank" rel="noopener noreferrer">Website</a></li>
              <li>Check the <a href="https://cyclotron.tamu.edu/ref/images/heavy_ion_beams.pdf" target="_blank" rel="noopener noreferrer">heavy ion beam list</a> to ensure the intended ion and necessary energy characteristics are available</li>
              <li>Determine <a href="https://cyclotron.tamu.edu/ref/images/Beam_Change_Time.PDF" target="_blank" rel="noopener noreferrer">beam charge time</a> to inform time request</li>
              <li>Contact Dr. Henry Clark for availability and hourly rate:</li>
              <ul>
                <li>Phone: 979-845-1411</li>
                <li>Email: clark@comp.tamu.edu</li>
                <li>8 hour minimum</li>
                <li>Cancellations must be at least 2 weeks in advance to avoid 50% fee</li>
              </ul>
              <li>To schedule testing time, submit the <a href="https://cyclotron.tamu.edu/ref/images/btrf.pdf"  target="_blank" rel="noopener noreferrer">beam request form</a> by email or fax:</li>
              <ul>
                <li>Fax: 979-458-3213</li>
                <li>Email: clark@comp.tamu.edu (Dr. Henry Clark)</li>
              </ul>
            </ul>
            <li><strong>Preparing for Visit</strong></li>
            <ul>
              <li><strong>Location:</strong></li>
              <ul>
                <li>Physical address: 120 Spence St, College Station, TX</li>
                <li>The Radiation Effects Facility is located within the Luedecke Cyclotron Institute building directly across Spence Street from the Zachary Engineering Education Complex and directly behind the Jack E. Brown Engineering Building</li>
                <li><a href="https://cyclotron.tamu.edu/ref/images/cyclotron_entry.pdf" target="_blank" rel="noopener noreferrer">Building Entry</a></li>
              </ul>
              <li><strong>Transportation and Lodging</strong></li>
              <ul>
                <li>Airports: <a href="https://www.flyeasterwood.com/" target="_blank" rel="noopener noreferrer">Easterwood</a> (local),
                    <a href="https://www.fly2houston.com/iah/overview/" target="_blank" rel="noopener noreferrer">Houston</a> (1.5 hour drive),
                    <a href="http://www.austintexas.gov/airport" target="_blank" rel="noopener noreferrer">Austin</a> (2 hour drive)</li>
                <li><a href="https://www.experiencebcs.com/hotels/" target="_blank" rel="noopener noreferrer">Hotels</a></li>
                <li><a href="https://cyclotron.tamu.edu/ref/images/parking_map.pdf" target="_blank" rel="noopener noreferrer">Parking</a></li>
              </ul>
              <li><strong>Shipping equipment</strong></li>
              <ul>
                <li>Address: ATTN: H. Clark or B. Hyman, Cyclotron Institute, 120 Spence Street, Texas A&M University MS #3366, College Station, TX 77843-3366</li>
                <li>For assistance contact Bruce Hyman</li>
                <ul>
                  <li>Phone: 979-845-1411</li>
                  <li>Email: bhyman@tamu.edu</li>
                </ul>
              </ul>
              <li><strong>**<a href="https://cyclotron.tamu.edu/ref/images/Safety%20Rules%202020.pdf" target="_blank" rel="noopener noreferrer">Safety</a>**</strong></li>
              <ul>
                <li><a href="https://cyclotron.tamu.edu/ref/images/safety_form_plus_map.pdf" target="_blank" rel="noopener noreferrer">Safety Orientation</a></li>
                <li>Make sure each team member submits the following to Dr. Henry Clark (hyman@comp.tamu.edu) at least 3 days in advance of testing</li>
                <ul>
                  <li>Watch Safety Orientation Training <a href="https://www.youtube.com/watch?v=MEAi0lLBp1s&feature=youtu.be" target="_blank" rel="noopener noreferrer">video</a></li>
                  <li>Take online Radiation Safety Test</li>
                  <li>Fill out the Radiation Badge Request Form</li>
                </ul>
              </ul>
              <li>Fill out <a href="https://cyclotron.tamu.edu/ref/images/REF%20Cyclotron%20Health%20Questionnarie.pdf" target="_blank" rel="noopener noreferrer">Health Questionnaire</a></li>
              <li>First time members and those without a dosimetry badge need to fill out the <a href="https://cyclotron.tamu.edu/ref/images/Request%20for%20Dosimetry%20Service%20%20march%202020.pdf" target="_blank" rel="noopener noreferrer">Dosimetry Request Form</a></li>
              <li><a href="https://cyclotron.tamu.edu/ref/heavy_ions.html" target="_blank" rel="noopener noreferrer">Information on heavy ion testing</a> (details on testing and setup rooms)</li>
              <li><a href="https://cyclotron.tamu.edu/ref/protons.html" target="_blank" rel="noopener noreferrer">Information on proton testing</a></li>
              <li>Check the <a href="https://cyclotron.tamu.edu/wp-content/uploads/current_beam.pdf" target="_blank" rel="noopener noreferrer">two month beam schedule</a> as your testing time approaches</li>
              <li>If you intend to use cryogenics, before you test you must:</li>
              <ul>
                <li>Submit a detailed description of the cryogenic setup and procedure</li>
                <li>Provide written confirmation a member of the testing team has previous experience testing with cryogenic liquids/</li>
                <li>Be thoroughly familiar with the information presented in the <a href="https://cyclotron.tamu.edu/ref/images/ci_ref_cryo_guidelines.pdf" target="_blank" rel="noopener noreferrer">cryogenic rules and regulation document</a></li>
                <li>Inform an operator on duty before testing on test day</li>
              </ul>
            </ul>
            <li><strong>Additional Resources</strong></li>
            <ul>
              <li><a href="https://cyclotron.tamu.edu/ref/images/brochure_2019.pdf" target="_blank" rel="noopener noreferrer">Facility Brochure</a></li>
              <li><a href="https://cyclotron.tamu.edu/ref/images/SEE%20K500%20customer%20map%202020.pdf" target="_blank" rel="noopener noreferrer">Building Map</a></li>
              <li><a href="https://cyclotron.tamu.edu/ref/images/TAMU%20beam%20characterization%20and%20verification.pdf" target="_blank" rel="noopener noreferrer">Beam characterization and verification</a></li>
              <li><a href="https://cyclotron.tamu.edu/ref/images/PCBDrawing.pdf" target="_blank" rel="noopener noreferrer">Typical board drawing</a></li>
              <li><a href="https://cyclotron.tamu.edu/ref/images/see_target_frame.pdf" target="_blank" rel="noopener noreferrer">Test frame drawing</a></li>
              <li><a href="https://cyclotron.tamu.edu/ref/images/in_air_platter.pdf" target="_blank" rel="noopener noreferrer">In-air platter drawing</a></li>
              <li><a href="https://cyclotron.tamu.edu/ref/images/K500%20SEE%20Heat%20Gun%20Controller%20Box%20Operator%20Manual.pdf" target="_blank" rel="noopener noreferrer">Hot air gun local operation</a></li>
              <li><a href="https://cyclotron.tamu.edu/ref/images/K500%20SEE%20Heat%20Gun%20Controller%20Box%20Operator%20Manual.pdf" target="_blank" rel="noopener noreferrer">K500 hot air gun remote operation</a></li>
            </ul>
          </ul>

          </Paragraph>
    </Stack>
  </Main>
);
