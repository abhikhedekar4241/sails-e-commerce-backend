/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
  /***************************************************************************
   *                                                                          *
   * Make the view located at `views/homepage.ejs` your home page.            *
   *                                                                          *
   * (Alternatively, remove this and add an `index.html` file in your         *
   * `assets` directory)                                                      *
   *                                                                          *
   ***************************************************************************/

  "/": { view: "pages/homepage" },

  /***************************************************************************
   *                                                                          *
   * More custom routes here...                                               *
   * (See https://sailsjs.com/config/routes for examples.)                    *
   *                                                                          *
   * If a request to a URL doesn't match any of the routes in this file, it   *
   * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
   * not match any of those, it is matched against static assets.             *
   *                                                                          *
   ***************************************************************************/

  // ******* Check working of API ********
  "GET /api": {
    controller: "UserController",
    action: "api",
  },

  //************* UserController start *************
  "POST /api/v1/users/signup": {
    controller: "UserController",
    action: "signup",
  },
  "POST /api/v1/users/login": {
    controller: "UserController",
    action: "login",
  },
  "POST /api/v1/users/update": {
    controller: "UserController",
    action: "updateUser",
  },
  "GET /api/v1/cart": {
    controller: "UserController",
    action: "getCart",
  },
  "POST /api/v1/cart": {
    controller: "UserController",
    action: "updateCart",
  },
  "POST /api/v1/cart/add": {
    controller: "UserController",
    action: "addToCart",
  },
  //************* UserController end *************

  //************* AddressController start *************
  "POST /api/v1/address/add": {
    controller: "AddressController",
    action: "addAddress",
  },
  "GET /api/v1/address/list": {
    controller: "AddressController",
    action: "getAddresses",
  },
  "GET /api/v1/address/:addressId": {
    controller: "AddressController",
    action: "getAddress",
  },
  "PUT /api/v1/address/:addressId": {
    controller: "AddressController",
    action: "updateAddress",
  },
  "DELETE /api/v1/address/:addressId": {
    controller: "AddressController",
    action: "deleteAddress",
  },
  //************* AddressController end *************

  //************* MasterCategoryController start *************
  "POST /api/v1/masterCategories/add": {
    controller: "MasterCategoryController",
    action: "addMasterCategory",
  },
  "GET /api/v1/masterCategories/list": {
    controller: "MasterCategoryController",
    action: "getMasterCategories",
  },
  "PUT /api/v1/masterCategories/:masterCategoryId": {
    controller: "MasterCategoryController",
    action: "updateMasterCategory",
  },
  "DELETE /api/v1/masterCategories/:masterCategoryId": {
    controller: "MasterCategoryController",
    action: "deleteMasterCategory",
  },
  //************* MasterCategoryController end *************

  //************* CategoryController start *************
  "POST /api/v1/categories/add": {
    controller: "CategoryController",
    action: "addCategory",
  },
  "GET /api/v1/categories/list/:masterCategoryId": {
    controller: "CategoryController",
    action: "getCategories",
  },
  "PUT /api/v1/categories/:categoryId": {
    controller: "CategoryController",
    action: "updateCategory",
  },
  "DELETE /api/v1/categories/:categoryId": {
    controller: "CategoryController",
    action: "deleteCategory",
  },
  //************* CategoryController end *************

  //************* ItemController start *************
  "POST /api/v1/items/add": {
    controller: "ItemController",
    action: "addItem",
  },
  "GET /api/v1/items/list/:categoryId": {
    controller: "ItemController",
    action: "getItems",
  },
  "GET /api/v1/items/:itemId": {
    controller: "ItemController",
    action: "getItem",
  },
  "PUT /api/v1/items/:itemId": {
    controller: "ItemController",
    action: "updateItem",
  },
  "DELETE /api/v1/items/:itemId": {
    controller: "ItemController",
    action: "deleteItem",
  },
  //************* ItemController end *************

  //************* OffersController start *************
  "GET /api/v1/offers/list": {
    controller: "OffersController",
    action: "getAllOffers",
  },
  "GET /api/v1/offers/:offerId": {
    controller: "OffersController",
    action: "getOffer",
  },
  "POST /api/v1/offers/add": {
    controller: "OffersController",
    action: "addOffer",
  },
  "PUT /api/v1/offers/:offerId": {
    controller: "OffersController",
    action: "updateOffer",
  },
  "DELETE /api/v1/offers/:offerId": {
    controller: "OffersController",
    action: "deleteOffer",
  },
  //************* OffersController end *************
};
