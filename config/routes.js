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
  "POST /api/v1/users/update/:userId": {
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
  //************* UserController end *************

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

  //************* ProductCategoryController start *************
  "POST /api/v1/categories/add": {
    controller: "ProductCategoryController",
    action: "addCategory",
  },
  "GET /api/v1/categories/list/:masterCategoryId": {
    controller: "ProductCategoryController",
    action: "getCategories",
  },
  "PUT /api/v1/categories/:categoryId": {
    controller: "ProductCategoryController",
    action: "updateCategory",
  },
  "DELETE /api/v1/categories/:categoryId": {
    controller: "ProductCategoryController",
    action: "deleteCategory",
  },
  //************* ProductCategoryController end *************

  //************* CategoryItemController start *************
  "POST /api/v1/items/add": {
    controller: "CategoryItemController",
    action: "addItem",
  },
  "GET /api/v1/items/list/:categoryId": {
    controller: "CategoryItemController",
    action: "getItems",
  },
  "GET /api/v1/items/:itemId": {
    controller: "CategoryItemController",
    action: "getItem",
  },
  "PUT /api/v1/items/:itemId": {
    controller: "CategoryItemController",
    action: "updateItem",
  },
  "DELETE /api/v1/items/:itemId": {
    controller: "CategoryItemController",
    action: "deleteItem",
  },
  //************* CategoryItemController end *************

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
