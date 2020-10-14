/**
 * MasterCategory.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    masterCategoryName: {
      type: "string",
      required: true,
    },
    masterCategoryId: {
      type: "string",
    },
    thumbnail: {
      type: "string",
      defaultsTo: "https://i.ytimg.com/vi/2QvOxa_7wEw/maxresdefault.jpg",
    },
  },
  beforeCreate: function (category, cb) {
    category.masterCategoryId = sails.config.globals.uniqid.time();
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
