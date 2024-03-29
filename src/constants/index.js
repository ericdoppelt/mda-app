import { makeStyles, createMuiTheme} from '@material-ui/core/styles';

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
    width: '100%',
    flex: 1,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    width: '100%',
    margin: 0,
    border: 0,
    flex: 1,
  },
  appBarSpacer: theme.mixins.toolbar
}));
