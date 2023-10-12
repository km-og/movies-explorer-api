const { celebrate, Joi } = require("celebrate");

const signinValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const signupValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const getUserByIdValidation = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex().required(),
  }),
});

const updateProfileValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().min(2).max(30).required(),
  }),
});

const createMovieValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().min(2),
    director: Joi.string().required().min(2),
    duration: Joi.number().required(),
    year: Joi.string().required().min(2),
    description: Joi.string().required().min(2),
    image: Joi.string()
      .required()
      .pattern(/https*:\/\/[w{3}.]?[\S]+#?\.[\S]+/i),
    trailerLink: Joi.string()
      .required()
      .pattern(/https*:\/\/[w{3}.]?[\S]+#?\.[\S]+/i),
    thumbnail: Joi.string()
      .required()
      .pattern(/https*:\/\/[w{3}.]?[\S]+#?\.[\S]+/i),
    owner: Joi.string().length(24).hex().required(),
    nameRU: Joi.string()
      .min(2)
      .required()
      .pattern(/[а-яё\s\d]+/i),
    nameEN: Joi.string()
      .min(2)
      .required()
      .pattern(/[\w\s\d]+/i),
  }),
});

const movieValidation = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex().required(),
  }),
});

module.exports = {
  signinValidation,
  signupValidation,
  getUserByIdValidation,
  updateProfileValidation,
  createMovieValidation,
  movieValidation,
};
