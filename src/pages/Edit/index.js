import React from 'react';
import { useParams } from 'react-router-dom';
import { Container } from '@material-ui/core';
import MovieForm from '../../components/MovieForm';

export default function Edit() {
  const { id } = useParams();
  return (
    <Container fixed>
      <MovieForm id={id} />
    </Container>
  );
}
