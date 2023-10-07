const router = require("express").Router();
const { login, createUser } = require("../controllers/users");
const NotFoundErr = require("../errors/NotFoundErr");
// const auth = require("../middlewares/auth");
const {
  signinValidation,
  signupValidation,
} = require("../middlewares/validation");
const { moviesRouter } = require("./movies");
const usersRouter = require("./users");

router.post("/signin", signinValidation, login);
router.post("/signup", signupValidation, createUser);
router.use("/users", usersRouter);
router.use("/movies", moviesRouter);

router.use("*", (req, res, next) => {
  next(new NotFoundErr("Данная страница не сущесвует"));
});

module.exports = router;
