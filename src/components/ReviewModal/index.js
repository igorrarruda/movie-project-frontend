import React from 'react';
import {
  Button,
  Modal,
  Backdrop,
  Fade,
  Typography,
  Grid,
  LinearProgress,
  makeStyles,
} from '@material-ui/core';
import { Create } from '@material-ui/icons';
import { Rating } from '@material-ui/lab';
import { Formik, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import * as Yup from 'yup';

import api from '../../services/api';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    width: '400px',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  formField: {
    marginTop: '10px',
  },
  bottomGrid: {
    marginTop: '10px',
  },
  buttonGrid: {
    textAlign: 'right',
  },
  errorHelper: {
    margin: 0,
    fontWeight: 400,
    lineHeight: 1.66,
    color: '#f44336',
    fontSize: '0.75rem',
    letterSpacing: '0.03333em',
  },
}));

const schema = Yup.object().shape({
  user: Yup.string().required('nome de usuário obrigatório'),
  comment: Yup.string(),
  rate: Yup.number()
    .typeError('Avaliação obrigatória')
    .min(1, 'Avaliação inválida')
    .max(5, 'Avaliação inválida')
    .required('Avaliação obrigatória'),
});

export default function ReviewModal({ movieId, beforeSubmit }) {
  let cleanReview = {
    user: '',
    comment: '',
    rate: null,
    movie: {
      id: movieId,
    },
  };

  const [openModal, setOpenModal] = React.useState(false);
  const classes = useStyles();

  const handleOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const submitForm = async (value) => {
    const config = {
      headers: {
        'content-type': 'application/json',
      },
    };
    const { data } = await api.post(
      `/review`,
      { ...value, movie: cleanReview.movie },
      config
    );
    beforeSubmit(data);
    setOpenModal(false);
  };

  return (
    <React.Fragment>
      <Button variant="outlined" startIcon={<Create />} onClick={handleOpen}>
        Escrever uma avaliação
      </Button>
      <Modal
        aria-labelledby="modal-review"
        aria-describedby="modal-to-review-movie"
        open={openModal}
        className={classes.modal}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModal}>
          <div className={classes.paper}>
            <Typography variant="h6" component="h1">
              Escreva sua avaliação
            </Typography>
            <Formik
              initialValues={cleanReview}
              enableReinitialize
              onSubmit={submitForm}
              validationSchema={schema}
              render={({
                values,
                handleSubmit,
                isSubmitting,
                handleChange,
                handleBlur,
                errors,
                touched,
              }) => (
                <form onSubmit={handleSubmit}>
                  {isSubmitting && <LinearProgress />}
                  <Field
                    component={TextField}
                    name="user"
                    label="Usuário"
                    className={classes.formField}
                    value={values.user}
                    fullWidth
                  />
                  <Field
                    component={TextField}
                    name="comment"
                    label="Comentário"
                    className={classes.formField}
                    value={values.comment}
                    multiline
                    fullWidth
                  />
                  <Grid container spacing={3} className={classes.bottomGrid}>
                    <Grid item xs={6}>
                      <Rating
                        name="rate"
                        value={Number(values.rate)}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.rate && touched.rate ? (
                        <p className={classes.errorHelper}>{errors.rate}</p>
                      ) : null}
                    </Grid>
                    <Grid item xs={6} className={classes.buttonGrid}>
                      <Button
                        type="submit"
                        size="small"
                        variant="outlined"
                        color="secondary"
                      >
                        Enviar Avaliação
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              )}
            />
          </div>
        </Fade>
      </Modal>
    </React.Fragment>
  );
}
