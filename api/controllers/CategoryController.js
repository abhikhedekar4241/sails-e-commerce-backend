/**
 * ProductCategoryController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  getCategories: async function (req, res) {
    Logger.verbose("CategoryController:getCategories called");
    let masterCategoryId = req.params.masterCategoryId;
    try {
      let categoryData = { masterCategoryId: masterCategoryId };
      Logger.info(categoryData);
      let categories = await Category.find(categoryData);
      Logger.info(categories);
      if (categories) {
        return res.status(200).json({
          status: 200,
          message: "Categories fetched Successfully.",
          data: categories,
        });
      } else {
        throw new Error("Categories not fetched");
      }
    } catch (err) {
      Logger.error(
        "Error in api: CategoryController:getCategories, name: " +
          err.name +
          ", code: " +
          err.code
      );
      return res.status(403).send({
        message: err.message,
      });
    }
  },

  addCategory: async function (req, res) {
    Logger.verbose("CategoryController:addCategory called");
    try {
      let categoryData = req.body;
      Logger.info(categoryData);
      let addedCategory = await Category.create(categoryData).fetch();
      Logger.info(addedCategory);
      if (addedCategory) {
        return res.status(200).json({
          status: 200,
          message: "Added category Successfully.",
          data: addedCategory,
        });
      } else {
        throw new Error("Category not added");
      }
    } catch (err) {
      Logger.error(
        "Error in api: CategoryController:addCategory, name: " +
          err.name +
          ", code: " +
          err.code
      );
      return res.status(403).send({
        message: err.message,
      });
    }
  },

  updateCategory: async function (req, res) {
    Logger.verbose("CategoryController:updateCategory called");
    try {
      let categoryId = req.params.categoryId;

      if (req.body._id) {
        delete req.body._id;
      }
      let categoryData = req.body;
      if (!req.params.categoryId) {
        throw new Error("categoryId field is required");
      }
      Logger.info(categoryData);
      let updatedCategory = await Category.updateOne({
        categoryId: categoryId,
      }).set(categoryData);

      Logger.info(updatedCategory);
      if (updatedCategory) {
        return res.status(200).json({
          status: 200,
          message: "Updated category Successfully.",
          data: updatedCategory,
        });
      } else {
        throw new Error("Category not updated");
      }
    } catch (err) {
      Logger.error(
        "Error in api: CategoryController:updateCategory, name: " +
          err.name +
          ", code: " +
          err.code
      );
      return res.status(403).send({
        message: err.message,
      });
    }
  },

  deleteCategory: async function (req, res) {
    Logger.verbose("CategoryController:deleteCategory called");
    try {
      let categoryId = req.params.categoryId;
      let categoryData = { categoryId: categoryId };

      Logger.info(categoryData);
      let deletedCategory = await Category.destroyOne(categoryData);
      let deleteItems = await Item.destroy(categoryData).fetch();
      Logger.info(deletedCategory);
      Logger.info(deleteItems);
      if (deleteItems) {
        return res.status(200).json({
          status: 200,
          message: "Deleted category Successfully.",
          data: {
            deletedCategory: deletedCategory,
            deleteItems: deleteItems,
          },
        });
      } else {
        throw new Error("Category not deleted");
      }
    } catch (err) {
      Logger.error(
        "Error in api: CategoryController:deleteCategory, name: " +
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
