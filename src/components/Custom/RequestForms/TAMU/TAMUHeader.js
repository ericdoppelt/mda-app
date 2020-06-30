import React from 'react';
import Image from '../../../../components/UIzard/Image';
import Stack from '../../../../components/UIzard/Stack';

class TAMUHeader extends React.Component {
    render() {
      return(
        <div>
          <Stack style={{ justifyContent: 'center', minWidth: '50px', minHeight: '50px' }}>
          <Image style={{ width: '210px', height: '150px', backgroundImage: 'url(/images/1388bb77-92c9-4f33-843b-4978f4a94606.png)' }} />
          <h1 variant="h1" component="h2">Lawrence Berkley National Lab Beam Request Form</h1>
          </Stack>
        </div>
      );
    }
  }
  
  export default TAMUHeader;