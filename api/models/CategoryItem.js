/**
 * CategoryItem.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    itemName: {
      type: "string",
      required: true,
    },
    itemId: {
      type: "string",
    },
    categoryId: {
      type: "string",
      required: true,
    },
    masterCategoryId: {
      type: "string",
      required: true,
    },
    images: {
      type: "json",
      columnType: "Array",
      defaultsTo: [
        "https://i.ytimg.com/vi/2QvOxa_7wEw/maxresdefault.jpg",
        "https://i.ytimg.com/vi/2QvOxa_7wEw/maxresdefault.jpg",
      ],
    },
  },
  beforeCreate: function (item, cb) {
    item.itemId = sails.config.globals.uniqid.time();
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
