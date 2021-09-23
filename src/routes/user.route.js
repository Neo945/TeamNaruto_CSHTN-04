const router = require("express").Router();
const view = require("../controllers/user.controller");

router.get("/logout", view.logout);
router.post("/login", view.login);
router.post("/register", view.registerUser);
router.get("/get", view.getUser);

module.exports = router;
