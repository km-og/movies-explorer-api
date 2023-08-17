const { getMovies, createMovie } = require("../controllers/movies");
const {
  createMovieValidation,
  movieValidation,
} = require("../middlewares/validation");

const moviesRouter = require("express").Router();

moviesRouter.get("/", getMovies);
moviesRouter.post("/", createMovieValidation, createMovie);
moviesRouter.delete("/:movieId", movieValidation, createMovie);

module.exports = { moviesRouter };
