import React from 'react';
import Image from '../../../../components/UIzard/Image';
import Paragraph from '../../../../components/UIzard/Paragraph';
import Row from '../../../../components/UIzard/Row';
import Card from '../../../../components/UIzard/Card';
import Stack from '../../../../components/UIzard/Stack';
import * as Constants from '../../../../constants'

export default function HeaderTAMU(){
  const classes = Constants.useStyles();

  return(

  <Stack style={{ flexGrow: '0', minWidth: '50px', minHeight: '50px' }}>
    <Row style={{ justifyContent: 'center', flexGrow: '0', minWidth: '50px', minHeight: '50px' }}>
      <Image style={{ width: '210px', height: '150px', backgroundImage: 'url(/images/1388bb77-92c9-4f33-843b-4978f4a94606.png)' }} />
    </Row>
    <Paragraph>
      <h1>Guide to Reserving Testing Time</h1>
    </Paragraph>
  </Stack>

  );
}
