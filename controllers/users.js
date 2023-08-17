const { mongoose } = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const BadReqErr = require("../errors/BadReqErr");
const ConflictErr = require("../errors/ConflictErr");
const NotFoundErr = require("../errors/NotFoundErr");

const getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    // User.findById(req.params.userId)
    .orFail()
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        next(new NotFoundErr("Пользователь с указанным _id не найден"));
        return;
      } else {
        next(err);
      }
    });
};

const createUser = (req, res, next) => {
  const { name, email, password } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) =>
      User.create({
        name,
        email,
        password: hash,
      })
        .then(() => {
          res.status(201).send({
            data: name,
            email,
          });
        })
        .catch((err) => {
          if (err instanceof mongoose.Error.ValidationError) {
            next(new BadReqErr("Переданы некорректные данные пользователя"));
            return;
          } else if (err.code === 11000) {
            next(new ConflictErr("Пользователь с таким email уже существует"));
            return;
          } else {
            next(err);
          }
        })
    )
    .catch((err) => {
      next(err);
    });
};

const updateProfile = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    {
      new: true,
      runValidators: true,
    }
  )
    .orFail()
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadReqErr("Переданы некорректные данные пользователя"));
        return;
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === "production" ? JWT_SECRET : "dev-secret",
        {
          expiresIn: "7d",
        }
      );
      res.send({ token });
      // res.cookie("jwt", token, {
      //   httpOnly: true,
      // });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = {
  getUserInfo,
  createUser,
  updateProfile,
  login,
};
