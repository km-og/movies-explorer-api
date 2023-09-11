const moviesRouter = require("express").Router();
const { getMovies, createMovie } = require("../controllers/movies");
const {
  createMovieValidation,
  movieValidation,
} = require("../middlewares/validation");
const auth = require("../middlewares/auth");

moviesRouter.get("/", auth, getMovies);
moviesRouter.post("/", auth, createMovieValidation, createMovie);
moviesRouter.delete("/:movieId", auth, movieValidation, createMovie);

module.exports = { moviesRouter };
