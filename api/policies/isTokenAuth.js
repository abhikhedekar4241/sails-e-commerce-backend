/**
 * sessionAuth
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
module.exports = async function (req, res, next) {
  // User is allowed, proceed to the next policy,
  // or if this is the last policy, the controller
  try {
    if (!req.header("authorization")) {
      return res.status(401).send({
        message: "Unauthorized. Missing Auth Header",
      });
    }
    var token = req.header("authorization").split(" ")[1];

    JwtService.verify(token, (err, resp) => {
      if (err) {
        Logger.error(err.message);
        return res.status(401).send({
          message: "Authorization Failed,Session might be expired.",
        });
        // throw new Error(err);
      }
      Logger.info("Verified Successfully");
      req.user = resp.user;
      Logger.info(resp);
      return next();
    });
  } catch (err) {
    Logger.error("sessionAuth:logout catch err");
    Logger.error(err);
    Logger.error(
      "Err in sessionAuth:logout, name: " + err.name + ", code: " + err.code
    );
    return res.status(403).send({
      message:
        "Something Went Wrong, May session timeout,Please try to login again.",
    });
  }
};
