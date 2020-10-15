/**
 * Offers.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    offerName: {
      type: "string",
      required: true,
    },
    offerId: { type: "string" },
    items: {
      type: "json",
      columnType: "Array",
      defaultsTo: [],
    },
  },
  beforeCreate: function (offer, cb) {
    offer.offerId = sails.config.globals.uniqid.time();
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
