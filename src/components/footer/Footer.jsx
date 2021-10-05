import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography } from "@material-ui/core";
import { Paper } from '@material-ui/core';
import { Stack } from '@mui/material';
import { Facebook, Instagram } from '@material-ui/icons';
import { Link } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
  grid: {
    width: '100%',
    margin: '10px'
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    background: theme.primary
  }
}));

function Footer() {
  const classes = useStyles();

  return (
    <Box sx={{m:"1em 2em"}}>
      <Paper>
        <Stack direction="row" spacing={2} 
          justifyContent="center"
          alignContent="center"
        >
          <a
            href="https://www.facebook.com/collarsforkings"
            className={classes.block}
            target="_blank"
            rel="noreferrer"
            >
            <Facebook/>
          </a>
          <a
            href="https://www.instagram.com/collarsforkings/"
            className={classes.block}
            target="_blank"
            rel="noreferrer"
            >
            <Instagram/>
          </a>

          <Link to="/Privacy">
            <Typography variant="body1">Privacy</Typography>
          </Link>

          <a
            href="https://www.termsandconditionsgenerator.com/live.php?token=qvfeJ0v09Lz9ai6m5ICJc6h81SWPr0up"
            className={classes.block}
            target="_blank"
            rel="noreferrer"
            >
            <Typography variant="body1">Terms</Typography>
          </a>
        </Stack>

      </Paper>

    </Box>
  );
}

export default Footer;