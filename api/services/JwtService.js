var jwt = require('jsonwebtoken');
var jwtSecret = sails.config.secrets.jwtSecret;

module.exports = {
  issue: function (payload) {
    Logger.log('JWTService.issue executed');
    token = jwt.sign(payload, jwtSecret,
    //    {
    //   expiresIn: 180 * 60
    // }
    );
    return token;
  },

  verify: function (token, callback) {
    Logger.log('JWTService.verify executed');
    return jwt.verify(token, jwtSecret, callback);
  }
};
