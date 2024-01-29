const jwt = require("jsonwebtoken");

require("dotenv").config();

module.exports.createAccessToken = (user) => {
  const data = {
    id: user.id,
    email: user.email,
  };

  return jwt.sign(data, process.env.SECRET, {});
};

module.exports.verify = (req, res, next) => {
  let token = req.headers.authorization;

  if (typeof token === "undefined") {
    return res.send({ auth: "Failed. No Token" });
  } else {
    // Removes the "Bearer" string
    token = token.slice(7, token.length);

    jwt.verify(token, process.env.SECRET, function (err, decodedToken) {
      if (err) {
        return res.send({
          auth: "Failed",
          message: err.message,
        });
      } else {
        console.log(decodedToken);
        req.user = decodedToken;

        next();
      }
    });
  }
};
