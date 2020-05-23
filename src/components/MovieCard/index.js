import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  Avatar,
  IconButton,
  Typography,
  Grid,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
} from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import clsx from 'clsx';
import randomColor from 'randomcolor';
import { MoreVert, ExpandMore, Edit, Delete } from '@material-ui/icons';
import { red } from '@material-ui/core/colors';
import { Link } from 'react-router-dom';

import ReviewModal from '../../components/ReviewModal';

const useStyles = makeStyles((theme) => ({
  root: {},
  media: {
    height: 0,
    padding: '10px 15px',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  modal: {
    textAlign: 'center',
    margin: '10px',
  },
  userName: {
    fontWeight: 'bold',
  },
  userComment: {
    color: '#9e9e9e',
    fontSize: '14px',
  },
  iconMenu: {
    minWidth: '35px',
  },
}));

export default function MovieCard({ movieItem, handleDelete }) {
  const [reviews, setReviews] = useState(movieItem.reviews);
  const [color] = useState(randomColor({ luminosity: 'dark' }));
  const [anchorEl, setAnchorEl] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const classes = useStyles();

  const handleShowMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const beforeSubmit = async (review) => {
    let updatedMovie = movieItem;
    updatedMovie.reviews = [...updatedMovie.reviews, review];
    updatedMovie.averageRatings =
      updatedMovie.reviews.reduce((sum, review) => sum + review.rate, 0) /
      updatedMovie.reviews.length;
    setReviews(updatedMovie.reviews);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" style={{ backgroundColor: color }}>
            {movieItem.title.charAt(0).toUpperCase()}
          </Avatar>
        }
        action={
          <>
            <IconButton
              aria-controls={`options-${movieItem.id}`}
              aria-haspopup="true"
              aria-label="settings"
              onClick={handleShowMenu}
            >
              <MoreVert />
            </IconButton>
            <Menu
              id={`options-${movieItem.id}`}
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleCloseMenu}
            >
              <MenuItem component={Link} to={`/edit/${movieItem.id}`}>
                <ListItemIcon className={classes.iconMenu}>
                  <Edit fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Editar" />
              </MenuItem>
              <MenuItem onClick={() => handleDelete(movieItem.id)}>
                <ListItemIcon className={classes.iconMenu}>
                  <Delete style={{ color: red[600] }} fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Remover" />
              </MenuItem>
            </Menu>
          </>
        }
        title={movieItem.title}
        subheader={movieItem.releaseYear}
      />
      <CardMedia
        className={classes.media}
        title={`Média: ${movieItem.averageRatings.toFixed(2)}`}
      >
        <Rating
          name="half-rating-average"
          size="small"
          value={movieItem.averageRatings}
          precision={0.5}
          readOnly
        />
      </CardMedia>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {movieItem.synopsis}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Typography>Avaliações</Typography>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMore />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <div className={classes.modal}>
          <ReviewModal movieId={movieItem.id} beforeSubmit={beforeSubmit} />
        </div>
        {movieItem.reviews.map((review) => (
          <CardContent key={review.id}>
            <Grid container spacing={3}>
              <Grid item xs={8}>
                <Typography className={classes.userName}>
                  {review.user}
                </Typography>
              </Grid>
              <Grid item xs={4} title={`Avaliação: ${review.rate}`}>
                <Rating
                  name="half-rating-read"
                  size="small"
                  defaultValue={review.rate}
                  precision={0.5}
                  readOnly
                />
              </Grid>
              <Grid item xs={12}>
                <Typography
                  paragraph
                  variant="body1"
                  className={classes.userComment}
                >
                  {review.comment}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        ))}
      </Collapse>
    </Card>
  );
}
