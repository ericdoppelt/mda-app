import React from 'react';
import Image from '../../../../components/UIzard/Image';
import Stack from '../../../../components/UIzard/Stack';
import { Typography } from '@material-ui/core';

class LBNLHeader extends React.Component {
  render() {
    return(
      <div>
        <Stack style={{ justifyContent: 'center', minWidth: '50px', minHeight: '50px' }}>
        <br/>
        <Image style={{ width: '210px', height: '150px', backgroundImage: 'url(/images/LBNLLogo.jpg)' }} />
        <br/>
        <Typography variant="h4">Beam Request</Typography>
        <Typography variant="h5">Lawrence Berkley National Lab</Typography>
        </Stack>
      </div>
    );
  }
}

export default LBNLHeader;