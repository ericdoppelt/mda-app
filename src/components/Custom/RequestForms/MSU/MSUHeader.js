import React from 'react';
import Image from '../../../../components/UIzard/Image';
import Stack from '../../../../components/UIzard/Stack';

class MSUHeader extends React.Component {
    render() {
      return(
        <div>
          <Stack style={{ justifyContent: 'center', minWidth: '50px', minHeight: '50px' }}>
          <Image style={{ width: '210px', height: '150px', backgroundImage: 'url(/images/MSULogo.png)'}} />
          <h1 variant="h1" component="h2">National Superconducting Cyclotron Laboratory <br/> Beam Request Form</h1>
          </Stack>
        </div>
      );
    }
  }
  
  export default MSUHeader;