import React from 'react';
import Image from '../../../../components/UIzard/Image';
import Stack from '../../../../components/UIzard/Stack';

class NSRLHeader extends React.Component {
    render() {
      return(
        <div>
          <Stack style={{ justifyContent: 'center', minWidth: '50px', minHeight: '50px' }}>
          <Image style={{ width: '250px', height: '120px', backgroundImage: 'url(/images/brnllogo.png)' }} />
          <h1 variant="h1" component="h2">Brookhaven National Laboratory<br/>Beam Request Form</h1>
          </Stack>
        </div>
      );
    }
  }
  
  export default NSRLHeader;