const Users = require("../users/users-model");
const bcrypt = require("bcryptjs");

function restrict() {
  const authError = {
    message: "You shall not pass!",
  };

  return async (req, res, next) => {
    try {
      if (!req.session || !req.session.user) {
        return res.status(401).json(authError);
      }

      // if checks pass above, the user is authorized
      next();
    } catch (err) {
      next(err);
    }
  };
}

module.exports = restrict;
