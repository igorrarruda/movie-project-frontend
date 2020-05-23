import React from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Divider,
  IconButton,
  Grid,
  makeStyles,
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import MovieForm from '../../components/MovieForm';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '20px 0',
    padding: '10px 20px 40px',
  },
  h1: {
    padding: '8px 0',
  },
}));

export default function Edit() {
  const { id } = useParams();
  const classes = useStyles();
  return (
    <Container fixed>
      <Paper className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={2}>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <IconButton>
                <ArrowBackIcon />
              </IconButton>
            </Link>
          </Grid>
          <Grid item xs={10}>
            <Typography className={classes.h1} variant="h5" component="h1">
              Editar filme
            </Typography>
          </Grid>
        </Grid>
        <Divider />
        <MovieForm id={id} />
      </Paper>
    </Container>
  );
}
