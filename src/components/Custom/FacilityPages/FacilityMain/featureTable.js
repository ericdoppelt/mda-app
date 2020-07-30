import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import {Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography} from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#424242',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  },
}))(TableRow);

const useStyles = theme => ({
  table: {
    width: '50%',
    marginBottom: '5%',
    align: 'center',
    marginLeft: '0%',
    marginRight: '25%',

  },
 subheader: {
   marginTop: '10%',
   marginBottom: '5%',
 },
});

function createData(facility, pieceparts, circuit_card_assemby, system_assembly, delidding, vacuum, air, contact, website) {
  return { facility, pieceparts, circuit_card_assemby, system_assembly, delidding, vacuum, air, contact, website };
}

const rows = [
  createData('TAMU', 'X', '', '', 'X', 'X', 'X', <Typography variant="body2">Henry Clark<br/>(979) 845-1411<br/>clark@comp.tamu.edu</Typography>, <Button href={'https://cyclotron.tamu.edu/'}><HomeIcon/></Button>),
  createData('LBNL', 'X', '', '', 'X', 'X', 'Some Capability', <Typography variant="body2">Mike Johnson<br/>(510) 486-4389<br/>mbjohnson@lbl.gov</Typography>, <Button href={'http://cyclotron.lbl.gov/'}><HomeIcon/></Button>),
  createData('NSRL', 'X', 'X', 'X', '', '', 'X', <Typography variant="body2">Mike Sivertz<br/>(631) 344-6102<br/>sivertz@bnl.gov</Typography>, <Button href={'https://www.bnl.gov/nsrl/'}><HomeIcon/></Button>),
];

class FeatureTable extends React.Component {

  render() {
    const { classes } = this.props;
  return (
    <div style={{width:'75%'}}>
    <Typography className={classes.subheader} variant='h4'>Compare Facility Capabilities</Typography>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Facility</StyledTableCell>
            <StyledTableCell align="center">Piece-Parts</StyledTableCell>
            <StyledTableCell align="center">Circuit Card Assemblies</StyledTableCell>
            <StyledTableCell align="center">System Assembly Level</StyledTableCell>
            <StyledTableCell align="center">De-lidding Required</StyledTableCell>
            <StyledTableCell align="center">Test in Vacuum?</StyledTableCell>
            <StyledTableCell align="center">Test in air?</StyledTableCell>
            <StyledTableCell align="center">Point of Contact</StyledTableCell>
            <StyledTableCell align="center">Website</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.facility}>
              <StyledTableCell component="th" scope="row" align="center">
                {row.facility}
              </StyledTableCell>
              <StyledTableCell align="center">{row.pieceparts}</StyledTableCell>
              <StyledTableCell align="center">{row.circuit_card_assemby}</StyledTableCell>
              <StyledTableCell align="center">{row.system_assembly}</StyledTableCell>
              <StyledTableCell align="center">{row.delidding}</StyledTableCell>
              <StyledTableCell align="center">{row.vacuum}</StyledTableCell>
              <StyledTableCell align="center">{row.air}</StyledTableCell>
              <StyledTableCell align="center">{row.contact}</StyledTableCell>
              <StyledTableCell align="center">{row.website}</StyledTableCell>

            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );}
}
export default withStyles(useStyles, { withTheme: true })(FeatureTable);
