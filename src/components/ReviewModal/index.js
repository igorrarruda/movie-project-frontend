import React, { useState } from 'react';
import {
  Button,
  TextField,
  Modal,
  Backdrop,
  Fade,
  Typography,
  Grid,
  makeStyles,
} from '@material-ui/core';
import { Create } from '@material-ui/icons';
import { Rating } from '@material-ui/lab';

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
  bottomGrid: {
    marginTop: '10px',
  },
  buttonGrid: {
    textAlign: 'right',
  },
}));

export default function ReviewModal({ movieId, beforeSubmit }) {
  let cleanReview = {
    user: '',
    comment: '',
    rate: null,
    movie: {
      id: movieId,
    },
  };

  const [newReview, setNewReview] = useState(cleanReview);
  const [openModal, setOpenModal] = React.useState(false);
  const classes = useStyles();

  const handleOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleInputChange = (e) => {
    setNewReview({
      ...newReview,
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
    const response = await api.post(`/review`, newReview, config);
    beforeSubmit(response.data);
    setNewReview(cleanReview);
    setOpenModal(false);
  };

  return (
    <>
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
            <form onSubmit={handleSubmit}>
              <TextField
                id="user"
                name="user"
                label="Usuário"
                onChange={handleInputChange}
                value={newReview.user}
                fullWidth
              />
              <TextField
                id="comment"
                name="comment"
                label="Comentário"
                onChange={handleInputChange}
                value={newReview.comment}
                multiline
                fullWidth
              />
              <Grid container spacing={3} className={classes.bottomGrid}>
                <Grid item xs={6}>
                  <Rating
                    name="rate"
                    value={Number(newReview.rate)}
                    onChange={handleInputChange}
                  />
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
          </div>
        </Fade>
      </Modal>
    </>
  );
}
