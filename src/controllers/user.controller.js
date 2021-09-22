const User = require("../models/user.model");

module.exports = {
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
          maxAge: require("../config/config").TOKEN_LENGTH,
        });
        res.status(201).json({ mesage: "login Successful" });
      } else {
        res.clearCookie("jwt");
        res.json({ mesage: "User not found" });
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
