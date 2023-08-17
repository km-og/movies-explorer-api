const { getUserInfo, updateProfile } = require("../controllers/users");
const { updateProfileValidation } = require("../middlewares/validation");

const usersRouter = require("express").Router();

usersRouter.get("/me", getUserInfo);
usersRouter.patch("/me", updateProfileValidation, updateProfile);

module.exports = usersRouter;
