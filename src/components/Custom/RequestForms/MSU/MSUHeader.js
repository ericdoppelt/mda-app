import React from 'react';
import Image from '../../../../components/UIzard/Image';
import Stack from '../../../../components/UIzard/Stack';
import {Typography} from '@material-ui/core';

class MSUHeader extends React.Component {
    render() {
      return(
        <div>
          <br/>
          <Stack style={{ justifyContent: 'center', minWidth: '50px', minHeight: '50px' }}>
          <Image style={{ width: '210px', height: '150px', backgroundImage: 'url(/images/MSULogo.png)'}} />
            <Typography variant="h4">Beam Request</Typography>
            <Typography variant="h5">National Superconducting Cyclotron Laboratory</Typography>
          </Stack>
        </div>
      );
    }
  }
  
  export default MSUHeader;