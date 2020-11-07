/**
 * AddressController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  getAddresses: async function (req, res) {
    Logger.verbose("AddressController:getAddresses called");
    try {
      let userId = req.user.userId;
      Logger.info(userId);

      let user = await User.find({ userId: userId });
      Logger.info(user);

      if (user) {
        let addressIds = user.addresses;
        let addresses = await Address.find({ addressId: addressIds });
        Logger.info(addresses);
        if (addresses) {
          return res.status(200).json({
            status: 200,
            message: "Addresses fetched Successfully.",
            data: addresses,
          });
        } else {
          throw new Error("Addresses not fetched");
        }
      } else {
        throw new Error("User not found.");
      }
    } catch (err) {
      Logger.error(
        "Error in api: AddressController:getAddresses, name: " +
          err.name +
          ", code: " +
          err.code
      );
      return res.status(403).send({
        message: err.message,
      });
    }
  },

  getAddress: async function (req, res) {
    Logger.verbose("AddressController:getAddress called");
    try {
      let addressId = req.params.addressId;
      Logger.info(addressId);

      let address = await Address.findOne({ addressId: addressId });
      Logger.info(address);
      if (address) {
        return res.status(200).json({
          status: 200,
          message: "Address fetched Successfully.",
          data: address,
        });
      } else {
        throw new Error("Address not fetched");
      }
    } catch (err) {
      Logger.error(
        "Error in api: AddressController:getAddress, name: " +
          err.name +
          ", code: " +
          err.code
      );
      return res.status(403).send({
        message: err.message,
      });
    }
  },

  addAddress: async function (req, res) {
    Logger.verbose("AddressController:addAddress called");
    try {
      let userId = req.user.userId;
      let user = await User.findOne({ userId: userId });

      if (user) {
        let addressData = req.body;
        Logger.info(addressData);
        var addedAddress = await Address.create(addressData).fetch();
        Logger.info(addedAddress);

        Logger.info(user.addresses);
        user.addresses.push(addedAddress.addressId);

        user = await User.updateOne({ userId: userId }).set({
          addresses: user.addresses,
        });
        Logger.info(addedAddress);

        if (user) {
          return res.status(200).json({
            status: 200,
            message: "Added address Successfully.",
            data: addedAddress,
          });
        } else {
          throw new Error("Address not added");
        }
      } else {
        throw new Error("User not found");
      }
    } catch (err) {
      Logger.error(
        "Error in api: AddressController:addAddress, name: " +
          err.name +
          ", code: " +
          err.code
      );
      return res.status(403).send({
        message: err.message,
      });
    }
  },

  updateAddress: async function (req, res) {
    Logger.verbose("AddressController:updateAddress called");

    try {
      let addressId = req.params.addressId;
      let user = await User.findOne({ addresses: addressId });
      Logger.info(user);

      if (user.userId === req.user.userId) {
        if (req.body.addressId || req.body._id) {
          delete req.body.addressId;
          delete req.body._id;
        }

        let addressData = req.body;
        Logger.info(addressData);

        let updatedAddress = await Address.updateOne({
          addressId: addressId,
        }).set(addressData);

        Logger.info(updatedAddress);

        if (updatedAddress) {
          return res.status(200).json({
            status: 200,
            message: "Address updated Successfully.",
            data: updatedAddress,
          });
        } else {
          throw new Error("Address not updated");
        }
      } else {
        throw new Error("You are not authorised for this operation.");
      }
    } catch (err) {
      Logger.error(
        "Error in api: AddressController:updateAddress, name: " +
          err.name +
          ", code: " +
          err.code
      );
      return res.status(403).send({
        message: err.message,
      });
    }
  },

  deleteAddress: async function (req, res) {
    Logger.verbose("AddressController:deleteAddress called");
    try {
      let addressId = req.params.addressId;
      let user = await User.findOne({ addresses: addressId });
      Logger.info(user);

      if (user.userId === req.user.userId) {
        let deletedAddress = await Address.destroyOne({ addressId: addressId });
        Logger.info(deletedAddress);

        user.addresses.pop(deletedAddress.addressId);
        user = await User.updateOne({ userId: user.userId }).set({
          addresses: user.addresses,
        });
        Logger.info(user);

        if (deletedAddress) {
          return res.status(200).json({
            status: 200,
            message: "Address deleted Successfully.",
            data: deletedAddress,
          });
        } else {
          throw new Error("Address not deleted");
        }
      } else {
        throw new Error("You are not authorised to do this operation.");
      }
    } catch (err) {
      Logger.error(
        "Error in api: AddressController:deleteAddress, name: " +
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
