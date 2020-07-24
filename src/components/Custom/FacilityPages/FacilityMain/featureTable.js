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
    width: '100%',
    marginBottom: '5%',


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
    <div>
    <Typography className={classes.subheader} variant='h4'>Compare Facility Capabilities</Typography>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Facility</StyledTableCell>
            <StyledTableCell align="right">Piece-Parts</StyledTableCell>
            <StyledTableCell align="right">Circuit Card Assemblies</StyledTableCell>
            <StyledTableCell align="right">System Assebmly Level</StyledTableCell>
            <StyledTableCell align="right">De-lidding Required</StyledTableCell>
            <StyledTableCell align="right">Test in Vacuum?</StyledTableCell>
            <StyledTableCell align="right">Test in air?</StyledTableCell>
            <StyledTableCell align="center">Point of Contact</StyledTableCell>
            <StyledTableCell align="right">Website</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.facility}>
              <StyledTableCell component="th" scope="row">
                {row.facility}
              </StyledTableCell>
              <StyledTableCell align="right">{row.pieceparts}</StyledTableCell>
              <StyledTableCell align="right">{row.circuit_card_assemby}</StyledTableCell>
              <StyledTableCell align="right">{row.system_assembly}</StyledTableCell>
              <StyledTableCell align="right">{row.delidding}</StyledTableCell>
              <StyledTableCell align="right">{row.vacuum}</StyledTableCell>
              <StyledTableCell align="right">{row.air}</StyledTableCell>
              <StyledTableCell align="center">{row.contact}</StyledTableCell>
              <StyledTableCell align="right">{row.website}</StyledTableCell>


            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );}
}
export default withStyles(useStyles, { withTheme: true })(FeatureTable);
