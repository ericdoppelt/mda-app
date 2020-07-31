import React from 'react';
import Image from '../../../../components/UIzard/Image';
import Stack from '../../../../components/UIzard/Stack';
import {Typography} from'@material-ui/core';

class NSRLHeader extends React.Component {
    render() {
      return(
        <div>
          <br/>
          <Stack style={{ justifyContent: 'center', minWidth: '50px', minHeight: '50px' }}>
          <Image style={{ width: '250px', height: '120px', backgroundImage: 'url(/images/brnllogo.png)' }}/>
          <Typography variant="h4">Beam Request</Typography>
          <Typography variant="h5">Brookhaven National Laboratory</Typography>
          </Stack>
        </div>
      );
    }
  }
  
  export default NSRLHeader;