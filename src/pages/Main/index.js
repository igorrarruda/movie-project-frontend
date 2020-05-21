import React, { useEffect, useState, useCallback } from 'react';
import {
  Container,
  Grid,
  Typography,
  Button,
  Card,
  CardHeader,
  styled,
} from '@material-ui/core';
import { Theaters, Create } from '@material-ui/icons';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import MovieCard from '../../components/MovieCard';

const MyCard = styled(Card)({
  margin: '20px 0',
});

export default function Main() {
  const [movies, setMovies] = useState(null);

  async function getMovies() {
    const { data } = await api.get(`/movies`);

    setMovies(data);
  }

  const init = useCallback(() => {
    getMovies();
  }, []);

  useEffect(() => {
    init();

    return () => setMovies([]);
  }, [init]);

  const handleDelete = async (id) => {
    await api.delete(`/movies/${id}`);
    setMovies(
      movies.filter(function (movie) {
        return movie.id !== id;
      })
    );
  };

  return (
    <React.Fragment>
      <Container maxWidth="md">
        <MyCard>
          <CardHeader
            avatar={<Theaters />}
            action={
              <Link to="/new" style={{ textDecoration: 'none' }}>
                <Button
                  startIcon={<Create />}
                  variant="contained"
                  color="secondary"
                >
                  Cadastrar Filme
                </Button>
              </Link>
            }
            title={
              <Typography variant="h5" component="h1">
                Avaliações e análises de Filmes
              </Typography>
            }
          />
        </MyCard>
        <Grid container spacing={3}>
          {movies &&
            movies.map((movie) => (
              <Grid item xs={12} sm={6} key={movie.id}>
                <MovieCard movieItem={movie} handleDelete={handleDelete} />
              </Grid>
            ))}
        </Grid>
      </Container>
    </React.Fragment>
  );
}
