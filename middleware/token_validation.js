const { verify } = require("jsonwebtoken");

const checkToken = (req, res, next) => {
  let token = req.get("authorization");
  if (token) {
    token = token.replace("Bearer ", "");
    verify(token, "qwe1234", (err, decoded) => {
      if (err) {
        res.status(403).send({ message: "Invalid Token" });
      } else {
        req.user = decoded.user
        next();
      }
    });
  } else {
    res.status(403).send({ message: "Access denied! unauthorized user" });
  }
};

module.exports = {
  checkToken,
};
