const usersRouter = require("express").Router();
const { getUserInfo, updateProfile } = require("../controllers/users");
const { updateProfileValidation } = require("../middlewares/validation");
const auth = require("../middlewares/auth");

usersRouter.get("/me", auth, getUserInfo);
usersRouter.patch("/me", auth, updateProfileValidation, updateProfile);

module.exports = usersRouter;
