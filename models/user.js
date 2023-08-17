const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const UnauthErr = require("../errors/UnauthErr");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Поле 'email' должно быть заполнено"],
      unique: true,
      validate: {
        validator: (v) => validator.isEmail(v),
        message: "Некорректный email",
      },
    },
    password: {
      type: String,
      required: [true, "Поле 'password' должно быть заполнено"],
      select: false,
    },
    name: {
      type: String,
      minlength: [2, "Минимальная длина поля 'name' - 2"],
      maxlength: [30, "Максимальная длина поля 'name' - 30"],
      required: [true, "Поле 'name' должно быть заполнено"],
    },
  },
  { versionKey: false }
);

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthErr("Неправильные почта или пароль"));
      } else {
        return bcrypt.compare(password, user.password).then((matched) => {
          if (!matched) {
            return Promise.reject(
              new UnauthErr("Неправильные почта или пароль")
            );
          } else {
            return user;
          }
        });
      }
    });
};

module.exports = mongoose.model("user", userSchema);
