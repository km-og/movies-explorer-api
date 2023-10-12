/* eslint-disable no-else-return */
/* eslint-disable no-useless-return */
const mongoose = require("mongoose");
const Movie = require("../models/movie");

const BadReqErr = require("../errors/BadReqErr");
const NotFoundErr = require("../errors/NotFoundErr");
const ForbiddenErr = require("../errors/ForbiddenErr");

const getMovies = (req, res, next) => {
  Movie.findById(req.user._id)
    .then((movies) => {
      res.send({ data: movies });
    })
    .catch((err) => {
      next(err);
    });
};

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    // trailer,
    nameRU,
    nameEN,
    thumbnail,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    // trailer,
    nameRU,
    nameEN,
    thumbnail,
    owner: req.user._id,
  }).then((movie) => {
    res
      .status(200)
      .send({ data: movie })
      .catch((err) => {
        if (err instanceof mongoose.Error.ValidationError) {
          next(new BadReqErr("Переданы некорректные данные карточки"));
          return;
        } else {
          next(err);
        }
      });
  });
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail()
    .then((movie) => {
      if (req.user._id === movie.owner.toString()) {
        movie
          .deleteOne()
          .then((delMovie) => {
            res.send({ data: delMovie });
          })
          .catch((err) => {
            next(err);
          });
      } else {
        throw new ForbiddenErr("Доступ к запрошенному ресурсу запрещен");
      }
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        next(new NotFoundErr("Карточка с указанным _id не найдена"));
        return;
      } else {
        next(err);
      }
    });
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
