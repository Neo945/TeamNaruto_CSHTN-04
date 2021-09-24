const User = require("../models/user.model");
const { errorHandler } = require("../utils/errorHandler");

module.exports = {
  getUser: (req, res) => {
    res.status(200).send({ user: req.user });
  },
  registerUser: (req, res) => {
    errorHandler(req, res, async () => {
      const newUser = await User.create({ ...req.body });
      res
        .status(201)
        .json({ message: "success", user: { ...newUser, password: null } });
    });
  },
  login: (req, res) => {
    errorHandler(req, res, async () => {
      const { password, email } = req.body;
      const token = await User.login(email, password);
      if (token) {
        res.cookie("jwt", token, {
          maxAge: 259200000,
        });
        res.status(201).json({
          mesage: "login Successful",
          user: await User.findOne({ email }),
        });
      } else {
        res.clearCookie("jwt");
        res.status(403).json({ mesage: "Login unsuccessful" });
      }
    });
  },
  logout: (req, res) => {
    errorHandler(req, res, () => {
      try {
        req.logout();
      } catch (err) {
        console.log(err);
      }
      res.clearCookie("jwt");
      res.json({ mesage: "Logged out successfully" });
    });
  },
};
