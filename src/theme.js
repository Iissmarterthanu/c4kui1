import { createTheme } from "@material-ui/core";

const theme = createTheme({
  palette: {
    primary: {
      main: '#eeefeb', //golden
    },
    secondary: {
      main: '#0b7276', //dark green
    },
    text: {primary: "#263238", secondary: "#cfd8dc"},
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