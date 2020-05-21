import React, { useState, useCallback, useEffect } from 'react';

import { useHistory, Link } from 'react-router-dom';
import {
  TextField,
  Button,
  Grid,
  Paper,
  Typography,
  Divider,
  IconButton,
  makeStyles,
} from '@material-ui/core';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import api from '../../services/api';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '20px 0',
    padding: '10px 20px 40px',
  },
  h1: {
    padding: '8px 0',
  },
  form: {
    marginTop: '20px',
  },
  buttonBox: {
    textAlign: 'right',
    marginTop: '20px',
  },
}));

export default function MovieForm({ id }) {
  let cleanMovie = {
    title: '',
    synopsis: '',
    releaseYear: '',
    crew: '',
    cast: '',
  };
  const classes = useStyles();
  const [movie, setMovie] = useState(cleanMovie);
  async function getMovie() {
    if (!id) return;
    const { data } = await api.get(`/movies/${id}`);

    setMovie(data);
  }

  const init = useCallback(() => {
    getMovie();
  }, []);

  useEffect(() => {
    init();

    return () => setMovie(cleanMovie);
  }, [init, cleanMovie]);

  const history = useHistory();
  const handleInputChange = (e) => {
    setMovie({
      ...movie,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        'content-type': 'application/json',
      },
    };
    if (id) {
      const editMovie = {
        title: movie.title,
        synopsis: movie.synopsis,
        releaseYear: movie.releaseYear,
        crew: movie.crew,
        cast: movie.cast,
      };
      await api.put(`/movies/${id}`, editMovie, config);
    } else {
      await api.post(`/movies/`, movie, config);
    }

    history.push('/');
    setMovie(cleanMovie);
  };

  return (
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
            Cadastrar novo filme
          </Typography>
        </Grid>
      </Grid>
      <Divider />
      <form onSubmit={handleSubmit} className={classes.form}>
        <Grid container spacing={3}>
          <Grid item xs={8}>
            <TextField
              id="title"
              name="title"
              label="Título"
              onChange={handleInputChange}
              value={movie.title}
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              id="releaseYear"
              name="releaseYear"
              label="Ano de Lançamento"
              onChange={handleInputChange}
              value={movie.releaseYear}
              fullWidth
            />
          </Grid>
        </Grid>
        <TextField
          id="synopsis"
          name="synopsis"
          label="Sinópse"
          onChange={handleInputChange}
          value={movie.synopsis}
          multiline
          fullWidth
        />
        <TextField
          id="crew"
          name="crew"
          label="Corpo técnico"
          onChange={handleInputChange}
          value={movie.crew}
          multiline
          fullWidth
        />
        <TextField
          id="cast"
          name="cast"
          label="Elenco"
          onChange={handleInputChange}
          value={movie.cast}
          multiline
          fullWidth
        />
        <div className={classes.buttonBox}>
          <Button type="submit" variant="contained" color="secondary">
            Salvar
          </Button>
        </div>
      </form>
    </Paper>
  );
}
