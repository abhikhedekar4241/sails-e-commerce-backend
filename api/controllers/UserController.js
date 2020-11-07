/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const bcrypt = require("bcrypt-nodejs");

module.exports = {
  api: function (req, res) {
    console.log("api called");
    Logger.log("logger log executed");
    Logger.debug("logger debug executed");
    Logger.info("logger info executed");
    Logger.warn("logger warn executed");
    Logger.error("logger error executed");
    return res.json({
      status: 200,
    });
  },

  signup: async function (req, res) {
    Logger.verbose("UserController:signup called");
    try {
      let userData = req.body;
      Logger.info(userData);

      let checkDuplicate = await User.find({ mobile: userData.mobile });

      if (checkDuplicate.length === 0) {
        var createdUser = await User.create(userData).fetch();
        Logger.info(createdUser);
        if (createdUser) {
          return res.status(200).json({
            status: 200,
            message: "User signup Successful.",
            token: JwtService.issue({
              user: createdUser,
            }),
            data: createdUser,
          });
        } else {
          throw new Error("User signup unsuccessful.");
        }
      } else {
        throw new Error("Mobile already registered");
      }
    } catch (err) {
      Logger.error(
        "Error in api: UserController:signup, name: " +
          err.name +
          ", code: " +
          err.code
      );
      return res.status(403).send({
        message: err.message,
      });
    }
  },

  login: async function (req, res) {
    try {
      var loginData = req.body;
      let notificationToken = req.body.notificationToken || "";

      var user = await User.findOne({
        mobile: loginData.mobile,
      });

      if (!user) {
        throw new Error("User Not Found.");
      }
      bcrypt.compare(
        loginData.password,
        user.password,
        async (err, isMatch) => {
          if (err) {
            Logger.error(err);
          }
          if (!isMatch) {
            return res.status(401).send({
              message: "Password invalid. Please try again.",
            });
          }
          req.session.loggedInUser = user;
          req.session.authenticated = true;
          await User.updateOne({ userId: user.userId }).set({
            notificationToken: notificationToken,
          });
          return res.json({
            status: 200,
            message: "User login Successful.",
            token: JwtService.issue({
              user: user,
            }),
            data: user,
          });
        }
      );
    } catch (err) {
      Logger.error(
        "Error in api: UserController:Login, name: " +
          err.name +
          ", code: " +
          err.code
      );
      return res.status(403).send({
        message: err.message,
      });
    }
  },

  updateUser: async function (req, res) {
    Logger.debug("UserController:updateUser called");
    Logger.verbose(req.body);
    if (req.body.userId || req.body._id) {
      delete req.body.userId;
      delete req.body._id;
    }
    let userData = req.body;
    Logger.info(userData);
    try {
      let userId = req.user.userId;

      if (userId && userId !== "") {
        let updatedUser = await User.updateOne({
          userId: userId,
        }).set(userData);
        Logger.info("UserController:updateUser");
        Logger.info(updatedUser);
        if (updatedUser) {
          return res.json({
            status: 200,
            message: "User Update Successful",
            data: updatedUser,
          });
        } else {
          throw new Error("User update unsuccessful");
        }
      } else {
        throw new Error("UserId Missing from request");
      }
    } catch (err) {
      Logger.error("UserController:updateUser catch err");
      Logger.error(err);
      Logger.error(
        "Error in api: updateUser, name: " + err.name + ", code: " + err.code
      );
      return res.status(403).send({
        message: err.message,
      });
    }
  },

  checkEmailAvailability: async function (req, res) {
    try {
      var emailid = req.query.email;

      var email = await User.findOne({
        email: emailid,
      });
      if (email) {
        return res.json({
          message: "This email already registered.",
          valid: false,
        });
      } else {
        return res.json({
          message: "This email is not yet registered.",
          valid: true,
        });
      }
    } catch (err) {
      Logger.error(
        "Error in api: UserController:EmailAvailability, name: " +
          err.name +
          ", code: " +
          err.code
      );
      return res.status(403).send({
        message: err.message,
      });
    }
  },

  updatePassword: async function (req, res) {
    if (req.body._id) {
      delete req.body._id;
    }
    let userId = req.params.userId;
    try {
      if (userId) {
        let updatedUser = await User.updateOne({
          userId: userId,
        }).set(req.body);
        Logger.info(updatedUser);
        if (updatedUser) {
          return res.status(200).send({
            status: 200,
            message: "User Password Update Successful",
            data: updatedUser,
          });
        } else {
          throw new Error("User Password update unsuccessful");
        }
      } else {
        throw new Error("Required field userId missing ");
      }
    } catch (err) {
      Logger.error("UserController:updatePassword catch err");
      Logger.error(err);
      Logger.error(
        "Error in api: updatePassword, name: " +
          err.name +
          ", code: " +
          err.code
      );
      return res.status(403).send({
        message: err.message,
      });
    }
  },

  recoverPassword: async function (req, res) {
    if (req.body._id) {
      delete req.body._id;
    }
    try {
      let mobile = req.params.mobile;
      if (mobile) {
        Logger.info("request body" + req.body);
        try {
          let updatedUser = await User.updateOne({
            mobile: mobile,
          }).set({ password: req.body.password });
          Logger.info(updatedUser);
          if (updatedUser) {
            return res.status(200).send({
              status: 200,
              message: "User Password Update Successful",
              data: updatedUser,
            });
          } else {
            return res.status(403).send({
              status: 403,
              message: "Something Went wrong",
            });
          }
        } catch (err) {
          Logger.error(
            "Err in api: UserController:RecoverPassword, name: " +
              err.name +
              ", code: " +
              err.code
          );
          return res.status(409).send({
            message: "Something went wrong,try again later.",
          });
        }
      } else {
        throw new Error("Mobile and OTP are required fields");
      }
    } catch (err) {
      Logger.error(err);
      Logger.error(
        "Error in api: recoverPassword, name: " +
          err.name +
          ", code: " +
          err.code
      );
      return res.status(403).send({
        message: err.message,
      });
    }
  },

  checkMobileAvailability: async function (req, res) {
    try {
      var number = req.query.mobile;
      var user = await User.findOne({
        mobile: number,
      });
      if (!user) {
        return res.json({
          status: 200,
          message: "Looks Good",
        });
      }
      if (user.mobile) {
        throw new Error("Mobile Number already registered");
      }
      throw new Error("Something went wrong");
    } catch (err) {
      Logger.error("UserController: checkMobileAvailabilitycatch err");
      Logger.error(err);
      Logger.error(
        "Error in api: checkMobileAvailability, name: " +
          err.name +
          ", code: " +
          err.code
      );
      return res.status(403).send({
        message: err.message,
      });
    }
  },

  findIdMiddleware: async function (req, res, next) {
    await User.findById(req.params.userId, (err, user) => {
      if (err) {
        res.status(500).send(err);
      } else if (user) {
        req.user = user;
        return next();
      } else {
        return res.status(200).send("No user Found");
      }
    });
  },

  logout: function (req, res) {
    try {
      Logger.verbose("logout called");
      req.user = null;
      req.session.authenticated = false;
      req.session.destroy();
      Logger.info("UserController:logout successful");
      return res.json({
        status: 200,
        message: "",
      });
    } catch (err) {
      Logger.error("UserController: logout catch error");
      Logger.error(err);
      Logger.error(
        "Error in api: logout, name: " + err.name + ", code: " + err.code
      );
      return res.status(403).send({
        message: err.message,
      });
    }
  },

  getCart: async function (req, res) {
    Logger.verbose("UserController:getCartItems called");
    try {
      let userId = req.user.userId;
      let userData = { userId: userId };
      Logger.info(userData);
      let user = await User.findOne(userData);
      let cartItems = user.cartItems;
      Logger.info(cartItems);

      let cartItemIds = [];
      for (let i = 0; i < cartItems.length; i++) {
        cartItemIds.push(cartItems[i].itemId);
      }
      Logger.info(cartItemIds);

      let cartItemsData = await Item.find({ itemId: cartItemIds });

      Logger.info(cartItemsData);
      if (cartItemsData) {
        return res.status(200).json({
          status: 200,
          message: "Cart Items fetched Successfully.",
          data: cartItemsData,
        });
      } else {
        throw new Error("Cart Items not fetched");
      }
    } catch (err) {
      Logger.error(
        "Error in api: UserController:getCartItems, name: " +
          err.name +
          ", code: " +
          err.code
      );
      return res.status(403).send({
        message: err.message,
      });
    }
  },

  updateCart: async function (req, res) {
    Logger.verbose("UserController:updateCart called");
    try {
      let userId = req.user.userId;
      let userData = { userId: userId };
      cartData = req.body;
      Logger.info(userData);

      let user = await User.findOne(userData);
      user.cartItems = cartData;

      let updatedUser = await User.updateOne({
        userId: userId,
      }).set(user);

      let updatedCart = updatedUser.cartItems;
      Logger.info(updatedCart);
      if (updatedCart) {
        return res.status(200).json({
          status: 200,
          message: "Cart Items updated Successfully.",
          data: updatedCart,
        });
      } else {
        throw new Error("Cart Items not updated");
      }
    } catch (err) {
      Logger.error(
        "Error in api: UserController:updateCart, name: " +
          err.name +
          ", code: " +
          err.code
      );
      return res.status(403).send({
        message: err.message,
      });
    }
  },

  addToCart: async function (req, res) {
    Logger.verbose("UserController:updateCart called");
    try {
      let userId = req.user.userId;
      item = req.body;
      Logger.info(item);

      let user = await User.findOne({ userId: userId });
      user.cartItems.push(item);

      let updatedUser = await User.updateOne({
        userId: userId,
      }).set({ cartItems: user.cartItems });

      let updatedCart = updatedUser.cartItems;
      Logger.info(updatedCart);
      if (updatedCart) {
        return res.status(200).json({
          status: 200,
          message: "Cart Items updated Successfully.",
          data: updatedCart,
        });
      } else {
        throw new Error("Cart Items not updated");
      }
    } catch (err) {
      Logger.error(
        "Error in api: UserController:updateCart, name: " +
          err.name +
          ", code: " +
          err.code
      );
      return res.status(403).send({
        message: err.message,
      });
    }
  },
};
