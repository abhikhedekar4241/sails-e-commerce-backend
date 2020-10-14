/**
 * isAdmin
 *
 * @module      :: Policy
 * @description :: Simple policy to check requested user is admin or not.
 *
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
module.exports = function (req, res, next) {
  // User is allowed, proceed to the next policy,
  // or if this is the last policy, the controller
  Logger.verbose("Policies:isAdmin called");
  if (req.user && req.user.role.toLowerCase() === "admin") {
    return next();
  }

  // User is not allowed
  // (default res.forbidden() behavior can be overridden in `config/403.js`)
  // return res.forbidden('You are not permitted to perform this action.');
  // return res.json({ status: 403, message: 'You are not permitted to perform this action.' });
  return res.status(403).send({
    message: "You are not permitted to perform this action.",
  });
};
