import React, { useState, useEffect } from 'react';

import { useHistory } from 'react-router-dom';
import { Button, Grid, LinearProgress, makeStyles } from '@material-ui/core';
import { Formik, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import * as Yup from 'yup';

import api from '../../services/api';

const useStyles = makeStyles((theme) => ({
  form: {
    marginTop: '20px',
  },
  formField: {
    marginTop: '10px',
  },
  buttonBox: {
    textAlign: 'right',
    marginTop: '20px',
  },
}));

const schema = Yup.object().shape({
  title: Yup.string().required('O título é obrigatório'),
  releaseYear: Yup.number()
    .integer('O ano de lançamento deve ser numérico')
    .positive('O ano de lançamento não pode ter valor negativo')
    .min(1896, 'O ano de lançamento inválido')
    .max(2100, 'O ano de lançamento inválido')
    .required('O ano de lançamento é obrigatório'),
  synopsis: Yup.string().required('A sinópse é obrigatória'),
  crew: Yup.string().required('O Corpo técnico é obrigatório'),
  cast: Yup.string().required('O Elenco é obrigatório'),
});

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
  const history = useHistory();

  useEffect(() => {
    if (!id) return;
    api
      .get(`/movies/${id}`)
      .then(({ data }) => {
        console.log(data);
        setMovie(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const submitForm = async (values) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const config = {
      headers: {
        'content-type': 'application/json',
      },
    };
    if (id) {
      const editMovie = {
        title: values.title,
        synopsis: values.synopsis,
        releaseYear: values.releaseYear,
        crew: values.crew,
        cast: values.cast,
      };
      await api.put(`/movies/${id}`, editMovie, config);
    } else {
      await api.post(`/movies/`, values, config);
    }

    setMovie(cleanMovie);
    history.push('/');
  };

  return (
    <Formik
      initialValues={movie}
      enableReinitialize
      onSubmit={submitForm}
      validationSchema={schema}
      render={({ values, handleSubmit, isSubmitting }) => (
        <form onSubmit={handleSubmit} className={classes.form}>
          {isSubmitting && <LinearProgress />}
          <Grid container spacing={3}>
            <Grid item xs={8}>
              <Field
                component={TextField}
                name="title"
                label="Título"
                value={values.title}
                className={classes.formField}
                fullWidth
              />
            </Grid>
            <Grid item xs={4}>
              <Field
                component={TextField}
                name="releaseYear"
                label="Ano de Lançamento"
                value={values.releaseYear}
                className={classes.formField}
                fullWidth
              />
            </Grid>
          </Grid>
          <Field
            component={TextField}
            name="synopsis"
            label="Sinópse"
            value={values.synopsis}
            className={classes.formField}
            multiline
            fullWidth
          />
          <Field
            component={TextField}
            name="crew"
            label="Corpo técnico"
            value={values.crew}
            className={classes.formField}
            multiline
            fullWidth
          />
          <Field
            component={TextField}
            name="cast"
            label="Elenco"
            value={values.cast}
            className={classes.formField}
            multiline
            fullWidth
          />
          <div className={classes.buttonBox}>
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              disabled={isSubmitting}
            >
              Salvar
            </Button>
          </div>
        </form>
      )}
    />
  );
}
