import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import Drawer from '@material-ui/core/Drawer';

export const darkTheme = createMuiTheme({
    palette: {
      background: {
        default: "#fafafa",
      },
      text: {
        primary: "rgba(0, 0, 0, 0.87)"
      },
      action: {
        active: "#fff",
      }
    },
  });

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  appBarSpacer: theme.mixins.toolbar
}));
