/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {
  /***************************************************************************
   *                                                                          *
   * Default policy for all controllers and actions, unless overridden.       *
   * (`true` allows public access)                                            *
   *                                                                          *
   ***************************************************************************/

  // '*': true,
  UserController: {
    "*": true,
    updateUser: ["isTokenAuth"],
    getCart: ["isTokenAuth"],
    updateCart: ["isTokenAuth"],
    addToCart: ["isTokenAuth"],
  },

  CategoryItemController: {
    "*": ["isTokenAuth", "isAdmin"],
    getItems: true,
    getItem: true,
  },

  ProductCategoryController: {
    "*": ["isTokenAuth", "isAdmin"],
    getCategories: true,
  },

  AddressController: {
    "*": ["isTokenAuth"],
  },
};
