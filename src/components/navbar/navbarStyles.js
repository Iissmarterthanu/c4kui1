import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  toolbar: {
    minHeight: 120,
    alignItems: 'flex-center',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    display: "block",
  },
  title: {
    flexGrow: 1,
  },

  // grow: theme.mixins.toolbar,
  grow: {
    height: theme.spacing(20),
  }
    
}));

export default useStyles