import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {AppBar, Box,Tab, Tabs, Typography} from '@material-ui/core';
import IonSearch from '../FacilityMain/ionSearch';
import FeatureTable from '../FacilityMain/featureTable';
import Row from '../../../../components/UIzard/Row';

/* Define style and function of TabPanel to be used in the exported function*/
//From material-ui Tab source code
function TabPanel(props) {
  const { children, value, index, ...other } = props;


  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};


const useStyles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },


});


/*Exports function that displays tabs and selected tab content*/
class TabsFacility extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      value: 0,
    }
  }

  a11yProps(index) {
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    };
  }

  render () {
    const {classes} = this.props;
    return(
        <div className={classes.root}>
            <AppBar position="static" color="default">
              <Tabs
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
                aria-label="full width tabs example"
              >
                {/*Tab header labels*/}
                <Tab onClick={() => this.setState({value: 0})} label="Search by Ion and Energy" {...this.a11yProps(0)} />
                <Tab onClick={() => this.setState({value: 1})} label="Compare Facility Capabilities" {...this.a11yProps(1)} />
              </Tabs>
            </AppBar>
              <TabPanel value={this.state.value} index={0}>
              <Row style={{ justifyContent: 'center', flexGrow: '0', minWidth: '50px', minHeight: '50px' }}>
                <IonSearch/>
              </Row>
              </TabPanel>
              <TabPanel value={this.state.value} index={1}>
              <Row style={{ justifyContent: 'center', flexGrow: '0', minWidth: '50px', minHeight: '50px' }}>
                <FeatureTable/>
              </Row>
              </TabPanel>
          </div>);
  }
}
export default withStyles(useStyles)(TabsFacility);
