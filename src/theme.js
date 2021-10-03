// import { createTheme } from "@material-ui/core";

import { blueGrey } from "@material-ui/core/colors";
import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#607d8b',
      light: '#eceff1',
      dark: '#33434a',
    },
    secondary: {
      main: '#693422',
      light: '#bb8979',
    },
    background: {
      paper: '#f3f3f3',
      default: '#f1f1f1',
    },
    text: {primary: blueGrey[900], secondary: blueGrey[100]},
  },

  typography: {
    fontFamily: 'Josefin Sans',
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 600,
    body2: {
      fontFamily: 'Pinyon Script',
      fontSize: '3rem',
      fontWeight: '600'
    }
  },
  
  
  overrides: {
    MuiButton: {
      root: {
        textTransform: "none",
        fontSize: "1.25rem"
      }
    }
  },

  props: {
    MuiButtons: {
      variant: "contained",
      color: "primary"
    }
  }


});

export default theme