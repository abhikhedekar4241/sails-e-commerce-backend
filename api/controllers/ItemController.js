/**
 * CategoryItemController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  getItems: async function (req, res) {
    Logger.verbose("ItemController:getItems called");
    try {
      let categoryId = req.params.categoryId;
      let itemData = { categoryId: categoryId };
      Logger.info(itemData);
      let items = await Item.find(itemData);
      Logger.info(items);
      if (items) {
        return res.status(200).json({
          status: 200,
          message: "Items fetched Successfully.",
          data: items,
        });
      } else {
        throw new Error("Items not fetched");
      }
    } catch (err) {
      Logger.error(
        "Error in api: ItemController:getItems, name: " +
          err.name +
          ", code: " +
          err.code
      );
      return res.status(403).send({
        message: err.message,
      });
    }
  },

  getItem: async function (req, res) {
    Logger.verbose("ItemController:getItem called");
    try {
      let itemId = req.params.itemId;
      let itemData = { itemId: itemId };
      Logger.info(itemData);
      let items = await Item.findOne(itemData);
      Logger.info(items);
      if (items) {
        return res.status(200).json({
          status: 200,
          message: "Item fetched Successfully.",
          data: items,
        });
      } else {
        throw new Error("Item not fetched");
      }
    } catch (err) {
      Logger.error(
        "Error in api: ItemController:getItem, name: " +
          err.name +
          ", code: " +
          err.code
      );
      return res.status(403).send({
        message: err.message,
      });
    }
  },

  addItem: async function (req, res) {
    Logger.verbose("ItemController:addItem called");
    try {
      let itemData = req.body;
      Logger.info(itemData);
      var addedItem = await Item.create(itemData).fetch();
      Logger.info(addedItem);
      if (addedItem) {
        return res.status(200).json({
          status: 200,
          message: "Added item Successfully.",
          data: addedItem,
        });
      } else {
        throw new Error("Item not added");
      }
    } catch (err) {
      Logger.error(
        "Error in api: ItemController:addItem, name: " +
          err.name +
          ", code: " +
          err.code
      );
      return res.status(403).send({
        message: err.message,
      });
    }
  },

  updateItem: async function (req, res) {
    Logger.verbose("ItemController:updateItem called");
    try {
      let itemId = req.params.itemId;

      if (req.body.itemId || req.body._id) {
        delete req.body.itemId;
        delete req.body._id;
      }

      let itemData = req.body;

      Logger.info(itemData);
      let updatedItem = await Item.updateOne({ itemId: itemId }).set(itemData);
      Logger.info(updatedItem);
      if (updatedItem) {
        return res.status(200).json({
          status: 200,
          message: "Item updated Successfully.",
          data: updatedItem,
        });
      } else {
        throw new Error("Item not updated");
      }
    } catch (err) {
      Logger.error(
        "Error in api: ItemController:updateItem, name: " +
          err.name +
          ", code: " +
          err.code
      );
      return res.status(403).send({
        message: err.message,
      });
    }
  },

  deleteItem: async function (req, res) {
    Logger.verbose("ItemController:deleteItem called");
    try {
      let itemId = req.params.itemId;

      let deletedItem = await Item.destroyOne({ itemId: itemId });
      Logger.info(deletedItem);
      if (deletedItem) {
        return res.status(200).json({
          status: 200,
          message: "Item deleted Successfully.",
          data: deletedItem,
        });
      } else {
        throw new Error("Item not deleted");
      }
    } catch (err) {
      Logger.error(
        "Error in api: ItemController:deleteItem, name: " +
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
