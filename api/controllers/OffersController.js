/**
 * OffersController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  getAllOffers: async function (req, res) {
    Logger.verbose("OffersController:getAllOffers called");
    try {
      let offers = await Offers.find({});
      Logger.info(offers);
      if (offers) {
        return res.status(200).json({
          status: 200,
          message: "Offers fetched Successfully.",
          data: offers,
        });
      } else {
        throw new Error("Offers not fetched");
      }
    } catch (err) {
      Logger.error(
        "Error in api: OffersController:getAllOffers, name: " +
          err.name +
          ", code: " +
          err.code
      );
      return res.status(403).send({
        message: err.message,
      });
    }
  },

  getOffer: async function (req, res) {
    Logger.verbose("OffersController:getOffer called");
    try {
      if (!req.params.offerId) {
        throw new Error("offerId field is required");
      }
      offerId = req.params.offerId;
      offerSearchData = { offerId: offerId };
      Logger.info(offerSearchData);
      let offer = await Offers.findOne(offerSearchData);
      Logger.info(offer);
      if (offer) {
        return res.status(200).json({
          status: 200,
          message: "Offers fetched Successfully.",
          data: offer,
        });
      } else {
        throw new Error("Offers not fetched");
      }
    } catch (err) {
      Logger.error(
        "Error in api: OffersController:getOffer, name: " +
          err.name +
          ", code: " +
          err.code
      );
      return res.status(403).send({
        message: err.message,
      });
    }
  },

  addOffer: async function (req, res) {
    Logger.verbose("OffersController:addOffer called");
    try {
      offerData = req.body;
      let createdOffer = await Offers.create(offerData).fetch();
      Logger.info(createdOffer);
      if (createdOffer) {
        return res.status(200).json({
          status: 200,
          message: "Offer added Successfully.",
          data: createdOffer,
        });
      } else {
        throw new Error("Offer not added");
      }
    } catch (err) {
      Logger.error(
        "Error in api: OffersController:addOffer, name: " +
          err.name +
          ", code: " +
          err.code
      );
      return res.status(403).send({
        message: err.message,
      });
    }
  },

  updateOffer: async function (req, res) {
    Logger.verbose("OffersController:updateOffer called");
    try {
      if (!req.params.offerId) {
        throw new Error("offerId field is required");
      }

      if (req.body._id || req.body.offerId) {
        delete req.body._id;
        delete req.body.offerId;
      }

      offerId = req.params.offerId;
      offerSearchData = { offerId: offerId };
      Logger.info(offerSearchData);

      offerData = req.body;
      Logger.info(offerData);

      let updatedOffer = await Offers.updateOne(offerSearchData).set(offerData);
      Logger.info(updatedOffer);

      if (updatedOffer) {
        return res.status(200).json({
          status: 200,
          message: "Offer updated Successfully.",
          data: updatedOffer,
        });
      } else {
        throw new Error("Offer not updated");
      }
    } catch (err) {
      Logger.error(
        "Error in api: OffersController:updateOffer, name: " +
          err.name +
          ", code: " +
          err.code
      );
      return res.status(403).send({
        message: err.message,
      });
    }
  },

  deleteOffer: async function (req, res) {
    Logger.verbose("OffersController:deleteOffer called");
    try {
      if (!req.params.offerId) {
        throw new Error("offerId field is required");
      }

      offerId = req.params.offerId;
      offerSearchData = { offerId: offerId };
      Logger.info(offerSearchData);

      let offer = await Offers.destroyOne(offerSearchData);
      Logger.info(offer);

      if (offer) {
        return res.status(200).json({
          status: 200,
          message: "Offer deleted Successfully.",
          data: offer,
        });
      } else {
        throw new Error("Offer not deleted");
      }
    } catch (err) {
      Logger.error(
        "Error in api: OffersController:deleteOffer, name: " +
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
