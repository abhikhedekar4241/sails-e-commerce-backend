/**
 * Address.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    addressId: {
      type: "string",
    },
    country: {
      type: "string",
      required: true,
    },
    fullName: {
      type: "string",
      required: true,
    },
    mobile: {
      type: "string",
      required: true,
    },
    pinCode: {
      type: "string",
      required: true,
    },
    houseNo: {
      type: "string",
      required: true,
    },
    area: {
      type: "string",
      required: true,
    },
    landmark: {
      type: "string",
      required: true,
    },
    state: {
      type: "string",
      required: true,
    },
    type: {
      type: "string",
      isIn: ["home", "office"],
      defaultsTo: "home",
    },
  },
  beforeCreate: function (address, cb) {
    address.addressId = sails.config.globals.uniqid.time();
    return cb();
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
