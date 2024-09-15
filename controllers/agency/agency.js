const Agency = require("../../models/agency/agency.modal");
const { strings } = require("../../utils/constants");

const createAgency = async (req, res) => {
  try {
    const { name, profile_image, location, user } = req.body;
    const hasAgency = await Agency.findOne({ userId: user.userId });
    if (hasAgency) {
      return res.status(200).send({ sucess: false, message: strings.YOU_ALREADY_HAS_AGENCY });
    }
    const newAgency = await Agency.create({
      userId: user.userId,
      name: name,
      profile_image: profile_image,
      location: location,
    });

    return res.status(200).send({ data: newAgency, sucess: true, message: strings.AGENCY_CREATED_SUCCESSFULLY });
  } catch (error) {
    console.log(error)
    return res.status(500).send({ message: strings.SERVER_ERROR, success: false });
  }
};

const editAgency = async (req, res) => {
  try {
    const { name, profile_image, location, rating, user } = req.body;
    const agency = await Agency.findOne({ userId: user.userId });
    const updateAgency = {};
    if (name)
      updateAgency.name = name;
    if (profile_image)
      updateAgency.profile_image = profile_image;
    if (location)
      updateAgency.location = location;
    if (rating)
      updateAgency.rating = rating;
    const updatedAgency = await Agency.findByIdAndUpdate(agency._id, updateAgency, { new: true });
    if (updatedAgency) {
      return res.status(200).send({ data: updatedAgency, sucess: true, message: strings.DOCUMENT_UPDATED_SUCCESSFULLY });
    } else {
      return res.status(404).send({ sucess: false, message: strings.NO_DOCUMENT_FOUND });
    }
  } catch (error) {
    return res.status(500).send({ message: strings.SERVER_ERROR, success: false });
  }
}

const deleteAgency = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Agency.findByIdAndDelete(id);
    if (deleted) {
      return res.status(200).send({ sucess: true, message: strings.DOCUMENT_DELETED });
    } else {
      return res.status(404).send({ sucess: false, message: strings.NO_DOCUMENT_FOUND });
    }

  } catch (error) {
    return res.status(500).send({ message: strings.SERVER_ERROR, success: false });
  }
}

module.exports = { createAgency, editAgency, deleteAgency };