import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { Box, List, ListItem } from "@material-ui/core";
import { Container, Grid, Paper, Typography } from '@material-ui/core';
import { Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Facebook, Instagram } from '@material-ui/icons';


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
        <Stack direction="row" spacing={2} justifyContent="center">
          <a
            href="https://www.facebook.com/search/top?q=collars%20for%20kings"
            className={classes.block}
            target="_blank"
            >
            <Facebook/>
          </a>
          <a
            href="https://www.instagram.com/collarsforkings/"
            className={classes.block}
            target="_blank"
            >
            <Instagram/>
          </a>
        </Stack>

      </Paper>

    </Box>
  );
}

export default Footer;