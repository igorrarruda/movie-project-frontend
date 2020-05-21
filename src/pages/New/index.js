import React from 'react';
import { Container } from '@material-ui/core';

import MovieForm from '../../components/MovieForm';

export default function New() {
  return (
    <Container maxWidth="sm">
      <MovieForm />
    </Container>
  );
}
