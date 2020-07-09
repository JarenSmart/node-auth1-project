const Users = require("../users/users-model");
const bcrypt = require("bcryptjs");

function restrict() {
  const authError = {
    message: "You shall not pass!",
  };

  return async (req, res, next) => {
    try {
      const { username, password } = req.headers;
      // make sure the values are not empty
      if (!username || !password) {
        return res.status(401).json(authError);
      }

      const user = await Users.findBy({ username }).first();
      // make sure the user exists in the database
      if (!user) {
        return res.status(401).json(authError);
      }

      const passwordValid = await bcrypt.compare(password, user.password);
      //make sure the password is correct
      if (!passwordValid) {
        return res.status(401).json(authError);
      }

      //the user is authorized
      next();
    } catch (err) {
      next(err);
    }
  };
}

module.exports = restrict;
