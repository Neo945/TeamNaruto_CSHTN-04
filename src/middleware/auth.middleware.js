const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

async function UserAuthentication(req, res, next) {
  console.log(req.cookies.jwt);
  if (req.cookies.jwt) {
    jwt.verify(req.cookies.jwt, process.env.SECRET_KEY, (err, id) => {
      console.log(id);
      if (err) {
        console.log(err);
        req.user = null;
        next();
      } else {
        User.findOne({ _id: id.id })
          .then((user) => {
            console.log(user);
            req.user = user;
            next();
          })
          .catch((erro) => console.log(erro));
      }
    });
  } else {
    req.user = null;
    next();
  }
}
module.exports = UserAuthentication;
