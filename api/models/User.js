/**
 * User.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
const bcrypt = require("bcryptjs");

module.exports = {
  attributes: {
    userId: {
      type: "string",
    },
    fullName: {
      type: "string",
      required: true,
    },
    email: {
      type: "string",
      unique: true,
      required: true,
    },
    mobile: {
      type: "string",
      unique: true,
      required: true,
    },
    password: {
      type: "string",
      required: true,
    },
    role: {
      type: "string",
      isIn: ["admin", "user"],
      defaultsTo: "user",
    },
    cartItems: {
      type: "json",
      columnType: "Array",
      defaultsTo: [],
    },
    addresses: {
      type: "json",
      columnType: "Array",
      defaultsTo: [],
    },
    notificationToken: {
      type: "string",
    },
    isActive: {
      type: "boolean",
      defaultsTo: true,
    },
  },

  beforeCreate: function (user, cb) {
    user.userId = sails.config.globals.uniqid.time();
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        console.log(err);
        return cb(err);
      } else {
        bcrypt.hash(user.password, salt, (err, hash) => {
          if (err) {
            console.log(err);
            return cb(err);
          } else {
            user.password = hash;
            return cb();
          }
        });
      }
    });
  },

  beforeUpdate: function (user, cb) {
    console.log("before update called- " + user.password);
    if (user.password) {
      bcrypt.genSalt(10, (err, salt) => {
        if (err) {
          console.log(err);
          return cb(err);
        } else {
          bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) {
              console.log(err);
              return cb(err);
            } else {
              user.password = hash;
              return cb();
            }
          });
        }
      });
    } else {
      return cb();
    }
  },
  customToJSON: function () {
    let omitFields = [
      "createdAt",
      "createdBy",
      "updatedAt",
      "updatedBy",
      "deletedBy",
      "deletedAt",
      "password",
    ];
    return _.omit(this, omitFields);
  },
};
