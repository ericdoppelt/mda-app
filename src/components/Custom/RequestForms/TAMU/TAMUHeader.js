import React from 'react';
import Image from '../../../../components/UIzard/Image';
import Stack from '../../../../components/UIzard/Stack';
import {Typography} from '@material-ui/core';

class TAMUHeader extends React.Component {
    render() {
      return(
        <div>
          <br/>
          <Stack style={{ justifyContent: 'center', minWidth: '50px', minHeight: '50px' }}>
          <Image style={{ width: '210px', height: '150px', backgroundImage: 'url(/images/1388bb77-92c9-4f33-843b-4978f4a94606.png)' }} />
          <Typography variant="h4">Beam Request</Typography>
          <Typography variant="h5">Texas A&M Radiation Effects Facility</Typography>
          </Stack>
        </div>
      );
    }
  }
  
  export default TAMUHeader;