const { login, createUser } = require("../controllers/users");
const NotFoundErr = require("../errors/NotFoundErr");
const auth = require("../middlewares/auth");
const {
  signinValidation,
  signupValidation,
} = require("../middlewares/validation");
const { moviesRouter } = require("./movies");
const usersRouter = require("./users");

const router = require("express").Router();

router.post("/signin", signinValidation, login);
router.post("/signup", signupValidation, createUser);
router.use("/users", auth, usersRouter);
router.use("/movies", auth, moviesRouter);

router.use("*", auth, (req, res, next) => {
  next(new NotFoundErr("Данная страница не сущесвует"));
});

module.exports = router;
