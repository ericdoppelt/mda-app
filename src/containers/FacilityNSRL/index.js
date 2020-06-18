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
          <h1>Brookhaven National Laboratory NSRL</h1>
        </Row>
        <Stack style={{ flexGrow: '0', minWidth: '50px', minHeight: '50px' }}>
          <Row style={{ justifyContent: 'center', flexGrow: '0', minWidth: '50px', minHeight: '50px' }}>
            <Image style={{ width: '250px', height: '120px', backgroundImage: 'url(/images/brnllogo.png)' }} />
          </Row>
        </Stack>
        <h2>Contact Information</h2>
        <Row style={{ justifyContent: 'center', flexGrow: '0', minWidth: '50px', minHeight: '50px' }}>
        <Paragraph>
            Physical Address:
            <br/>
            <br/>
            1 Cyclotron Rd. Bldg. 88,
            <br/>
            Berkeley, CA 94720
            <br/>
            <br/>
            Admin Office Address:
            <br/>
            <br/>
            Lawrence Berkeley National Laboratory
            <br/>
            88-Inch Cyclotron Admin Office
            <br/>
            One Cyclotron Road, MS 88R0192
          </Paragraph>
        </Row>
        <h2>Additional Information</h2>
        <Paragraph>
          <a href="https://www.bnl.gov/nsrl/userguide/" target="_blank" rel="noopener noreferrer">First Time User Info</a>
          <br/>
          <a href="https://www.bnl.gov/nsrl/about.php" target="_blank" rel="noopener noreferrer">About The Site</a>
          <br/>
          <a href="https://www.bnl.gov/nsrl/facility-users/" target="_blank" rel="noopener noreferrer">Beam Request Portal</a>
          <br/>
          <a href="https://www.bnl.gov/maps/" target="_blank" rel="noopener noreferrer">Maps and Directions</a>
          <br/>
          <a href="https://www.bnl.gov/guv/id.php" target="_blank" rel="noopener noreferrer">Identification Requirements</a>
          <br/>
          <a href="https://www.bnl.gov/nsrl/facility-users/steps.php" target="_blank" rel="noopener noreferrer">Required Training Steps</a>
          <br/>
          <a href="https://www.bnl.gov/training/pass/" target="_blank" rel="noopener noreferrer">Training Portal</a>
        </Paragraph>
        <h2>Additional Documents</h2>
        <Paragraph>
          <a href="https://drive.google.com/file/d/0B-7RPAKnuE05XzRSYlJ3RU1Dc2xEaFJOaUdBVkJ2OFdJeEFz/view" target="_blank" rel="noopener noreferrer">Affiliate Forms</a>
        </Paragraph>
        <h3>Guide to Reserving Testing Time</h3>
        <Paragraph>
          <ul>
            <li><strong>Initial Steps</strong></li>
            <ul>
              <li><a href="https://www.bnl.gov/nsrl/" target="_blank" rel="noopener noreferrer">Website</a></li>
              <li>Use the <a href="https://www.bnl.gov/nsrl/facility-users/" target="_blank" rel="noopener noreferrer">Apply for Beam Time</a> portal to submit beam request</li>
              <ul>
                <li>Review beam capabilites</li>
              </ul>
              <li>After deciding how much beam time your work will require, your funding institution must submit a Purchase Order (PO) requesting the hours of time</li>
              <ul>
                <li>After deciding how much beam time your work will require, your funding institution must submit a Purchase Order (PO) requesting the hours of time</li>
                <li>For information on opening an account for beam time, contact NSRL Finance Officer at nsrlfin@bnl.gov</li>
                <li>Mail, email, or fax orders to Ken Koebel, Business Services Directorate</li>
                <ul>
                  <li>Address: Mail Stop 179A, Brookhaven National Laboratory, Upton, NY 11973-5000</li>
                  <li>Phone: (631) 344-7351</li>
                  <li>Fax: (631) 344-3021</li>
                </ul>
              </ul>
              <li>Establish orverify agreement with BNL to cover research</li>
              <ul>
                <li><a href="https://www.bnl.gov/guv/agreements/index.php" target="_blank" rel="noopener noreferrer">List of institutions with agreements</a></li>
                <li>If your institution is not on the list, complete the <a href="https://www.bnl.gov/guv/ufaQuestionnaire/" target="_blank" rel="noopener noreferrer">User Agreement Questionnaire</a></li>
                <li>Address questions to Amanda Satterley at the Guest, User, Visitor Center</li>
                <ul>
                  <li>Phone: (631) 344-5076 </li>
                  <li>Email: agreements@bnl.gov</li>
                  <li>Fax: (631) 344-8686</li>
                </ul>
              </ul>
            </ul>
            <li><strong>Preparing for Visit</strong></li>
            <ul>
              <li>If you do not have a valid BNL ID, you must register in BNL’s <a href="https://www.bnl.gov/guv/gis.php" target="_blank" rel="noopener noreferrer">Guest Information System</a> (GIS)</li>
              <ul>
                <li>Can take up to 45 calendar days to complete</li>
                <li>Contact Guest, User, Visiter Center for questions</li>
                <ul>
                  <li>Email: guvcenter@bnl.gob</li>
                  <li>Phone: (631) 344-3333</li>
                </ul>
              </ul>
              <li>Submit BNL Arrival Notification to <a href="Submit BNL Arrival Notification to Guest Central web page" target="_blank" rel="noopener noreferrer">Guest Central web page</a></li>
              <li><a href="https://www.bnl.gov/staffservices/onsitehousing.php" target="_blank" rel="noopener noreferrer"><strong>Housing</strong></a></li>
              <ul>
                <li>Must first be registered in the Guest Information System</li>
                <li>To reserve on-site housing, call the BNL Housing Office</li>
                <ul>
                  <li>Phone: (631) 344-2541 or 344-2551</li>
                  <li>Email: housing@bnl.gov</li>
                </ul>
              </ul>
              <li><a href="https://www.bnl.gov/training/pass/" target="_blank" rel="noopener noreferrer"><strong>Training</strong></a></li>
              <ul>
                <li>Must first be registered in the Guest Information System</li>
                <li>Complete Cyber Security training  and Guest Site Orientation found <a href="https://www.bnl.gov/training/pass/" target="_blank" rel="noopener noreferrer">here</a></li>
                <li>Complete RadWorker I - Intro and Radiological Worker 1 - Computer Challenge</li>
                <ul>
                  <li>Filter by "Radiological"</li>
                  <li>The computer challenge is a difficult, 50-question timed test, and it must be completed in one uninterrupted sitting</li>
                  <li>Reading the <a href="https://training.bnl.gov/StudyGuides/RWT/RWT002.PDF" target="_blank" rel="noopener noreferrer">study guide</a> is highly recommended</li>
                </ul>
                <li>Contact NSRL Liaison Scientists (nsrladmin@bnl.gov) for questions</li>
                <li>Additional training may be assigned. Check your ob Training Assignments (JTAs) on the <a href="http://www.bnl.gov/training/" target="_blank" rel="noopener noreferrer">BNL Training Website</a></li>
              </ul>
              <li>Bring <a href="https://www.bnl.gov/guv/id.php" target="_blank" rel="noopener noreferrer">proper identification</a> on test day</li>
              <li><a href="https://www.bnl.gov/maps/" target="_blank" rel="noopener noreferrer">Directions to test facility</a></li>
              <li>All guests, users, and visitors must check-in at the Guest, User, Visitor Center, which is located in <a href="http://www.bnl.gov/maps/point.php?Lat=40.86808&Lng=-72.88330" target="_blank" rel="noopener noreferrer">Building 400A</a></li>
              <li>You MUST complete a dry run of your experiment before testing at NSRL. Contact NSRL Liaison Biologist (nsrllb@bnl.gov)</li>
            </ul>
            <li><strong>Additional Resources</strong></li>
            <ul>
              <li><a href="https://www.bnl.gov/nsrl/userguide/" target="_blank" rel="noopener noreferrer">First-Time User Information</a></li>
              <li><a href="https://www.bnl.gov/nsrl/about.php" target="_blank" rel="noopener noreferrer">About</a></li>
              <li><a href="https://www.bnl.gov/nsrl/runinfo.php" target="_blank" rel="noopener noreferrer">Run Information</a></li>
              <li><a href="https://www.bnl.gov/nsrl/userguide/calculating-time.php" target="_blank" rel="noopener noreferrer">Calculating Target Room access time</a></li>
              <li><a href="https://www.bnl.gov/nsrl/userguide/sample-holders.php" target="_blank" rel="noopener noreferrer">Sample holders</a></li>
            </ul>
          </ul>
        </Paragraph>
      </Card>
    </Row>
  </Main>
);
