/**
 * MasterCategoryController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  getMasterCategories: async function (req, res) {
    Logger.verbose("MasterCategoryController:getMasterCategories called");
    try {
      let masterCategoryData = {};
      Logger.info(masterCategoryData);
      let masterCategories = await MasterCategory.find(masterCategoryData);
      Logger.info(masterCategories);
      if (masterCategories) {
        return res.status(200).json({
          status: 200,
          message: "Master Categories fetched Successfully.",
          data: masterCategories,
        });
      } else {
        throw new Error("Master Categories not fetched");
      }
    } catch (err) {
      Logger.error(
        "Error in api: MasterCategoryController:getMasterCategories, name: " +
          err.name +
          ", code: " +
          err.code
      );
      return res.status(403).send({
        message: err.message,
      });
    }
  },

  addMasterCategory: async function (req, res) {
    Logger.verbose("MasterCategoryController:addMasterCategory called");
    try {
      let masterCategoryData = req.body;
      Logger.info(masterCategoryData);
      var addedMasterCategory = await MasterCategory.create(
        masterCategoryData
      ).fetch();
      Logger.info(addedMasterCategory);
      if (addedMasterCategory) {
        return res.status(200).json({
          status: 200,
          message: "Added Master category Successfully.",
          data: addedMasterCategory,
        });
      } else {
        throw new Error("Master Category not added");
      }
    } catch (err) {
      Logger.error(
        "Error in api: MasterCategoryController:addMasterCategory, name: " +
          err.name +
          ", code: " +
          err.code
      );
      return res.status(403).send({
        message: err.message,
      });
    }
  },

  updateMasterCategory: async function (req, res) {
    Logger.verbose("MasterCategoryController:updateMasterCategory called");
    try {
      if (req.body._id) {
        delete req.body._id;
      }
      if (!req.params.masterCategoryId) {
        throw new Error("masterCategoryId field is required");
      }

      let masterCategoryId = req.params.masterCategoryId;

      let masterCategoryData = req.body;

      Logger.info(masterCategoryData);

      let updatedMasterCategory = await MasterCategory.updateOne({
        masterCategoryId: masterCategoryId,
      }).set(masterCategoryData);

      Logger.info(updatedMasterCategory);
      if (updatedMasterCategory) {
        return res.status(200).json({
          status: 200,
          message: "Updated master category Successfully.",
          data: updatedMasterCategory,
        });
      } else {
        throw new Error("Master Category not updated");
      }
    } catch (err) {
      Logger.error(
        "Error in api: MasterCategoryController:updateMasterCategory, name: " +
          err.name +
          ", code: " +
          err.code
      );
      return res.status(403).send({
        message: err.message,
      });
    }
  },

  deleteMasterCategory: async function (req, res) {
    Logger.verbose("MasterCategoryController:deleteMasterCategory called");
    try {
      let masterCategoryId = req.params.masterCategoryId;
      let masterCategoryData = { masterCategoryId: masterCategoryId };

      Logger.info(masterCategoryData);
      let deletedMasterCategory = await MasterCategory.destroyOne(
        masterCategoryData
      );
      let deleteCategories = await Category.destroy(masterCategoryData).fetch();
      let deleteItems = await Item.destroy(masterCategoryData).fetch();

      Logger.info(deletedMasterCategory);
      Logger.info(deleteCategories);
      Logger.info(deleteItems);

      if (deleteItems) {
        return res.status(200).json({
          status: 200,
          message: "Deleted category Successfully.",
          data: {
            deletedMasterCategory: deletedMasterCategory,
            deleteCategories: deleteCategories,
            deleteItems: deleteItems,
          },
        });
      } else {
        throw new Error("Category not deleted");
      }
    } catch (err) {
      Logger.error(
        "Error in api: MasterCategoryController:deleteMasterCategory, name: " +
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
