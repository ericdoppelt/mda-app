import React from 'react'
import axios from 'axios';
import './ViewRequests.scss'

import { withStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

const columns = [
  { id: 'name', label: 'Name', minWidth: 130 },
  { id: 'username', label: 'User ID', minWidth: 80 },
  {
    id: 'facility',
    label: 'Facility',
    minWidth: 120,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'integrator',
    label: 'Integrator',
    minWidth: 120,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'company',
    label: 'Company',
    minWidth: 120,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'viewMore',
    label: '',
    minWidth: 120,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
];

function createData(name, username, facility, integrator, company) {
  var viewMore = 'View More'
  return { name, username, facility, integrator, company, viewMore };
}

const rows = [
  createData('James James', 'jj10', 'MSU', 'MDA', 'Boeing'),
  createData('Jim Jim', 'jj76', 'TAMU', 'MDA', 'Boeing'),
  createData('Kim Kim', 'kk15', 'TAMU', 'MDA', 'Aerospace Corp.'),
  createData('Michael McKenna', 'mm92', 'NSRL', 'MDA', 'MDA'),
  createData('Jodi Jansen', 'jj94', 'LBNL', 'MDA', 'MDA'),
  createData('Sam Sam', 'ss35', 'LBNL', 'MDA', 'UTC'),
  createData('Sam Sam', 'ss35', 'MSU', 'MDA', 'UTC'),
  createData('Ken Ken', 'kk37', 'MSU', 'MDA', 'Aerospace Corp.'),
  createData('Bridget Bridget', 'bb24', 'TAMU', 'MDA', 'Boeing'),
  createData('Joan Joan', 'jj12', 'TAMU', 'MDA', 'Aerospace Corp.'),
  createData('Tim Tim', 'tt77', 'NSRL', 'MDA', 'UTC'),
  createData('Jamie Jamie', 'jj23', 'NSRL', 'MDA', 'MDA'),
  createData('Anna Anna', 'aa89', 'NSRL', 'MDA', 'UTC'),
  createData('Jane Jane', 'jj16', 'NSRL', 'MDA', 'Aerospace Corp.'),
  createData('Jan Jan', 'jj25', 'NSRL', 'MDA', 'Aerospace Corp.'),
];

const useStyles = theme => ({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
    //background: '#FFC0CB'
    background: {
      default: "#fafafa"
    },
    text: {
      primary: "rgba(0, 0, 0, 0.87)"
    }
  },
});

class ViewRequests extends React.Component {

  /*** INITIALIZE STATE VARIABLES ***/
  calendarComponentRef = React.createRef();
  
  constructor(props) {
    super(props);

    /*** LIST OF DATES ***/
    this.state = {
      username: "",
      facility: "",
      integrator: "",
      totalTime: "",
      startDate: "",
      cannotRun: "",
      data: [],
      page: 0,
      rowsPerPage: 10
    }
  }

  
  
  /*** COLLECT CALENDAR DATA FROM HEROKU ***/
  async componentDidMount(username) {
    const url = "https://mda-phoenix.herokuapp.com/calendar";
    var self = this;
    await axios.post(url).then(response => {

    })
    .catch(error => {
      console.log(error);
    });
  }


  /*** RENDER CALENDAR APPEARANCE ***/
  render() {
    var self = this;
    
    const { classes } = this.props;
    const handleChangePage = (event, newPage) => {
      this.setState({page: newPage});
    };
    const handleChangeRowsPerPage = (event) => {
      this.setState({rowsPerPage: this.state.rowsPerPage + event.target.value})
      this.setState({page: 0});
    };

    const page = this.state.page;
    const rowsPerPage = this.state.rowsPerPage;
    
    return (
      <ThemeProvider theme={darkTheme}>
        <div className='view-requests'>
          <div className='view-requests-inner'>
            <Paper className={classes.root}>
              <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{ minWidth: column.minWidth }}
                        >
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                      return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={row.name} style={{ backgroundColor: 'white' }}>
                          {columns.map((column) => {
                            const value = row[column.id];
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {column.format && typeof value === 'number' ? column.format(value) : value}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                style={{ backgroundColor: 'white' }}
              />
            </Paper>
          </div>
        </div>
      </ThemeProvider>
    )
  }

}

export default withStyles(useStyles)(ViewRequests)