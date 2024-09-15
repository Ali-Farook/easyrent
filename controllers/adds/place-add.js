const { strings } = require("../../utils/constants");
const Add = require('../../models/add/add.model');

const getAllAdds = async (req, res) => {
  try {
    const page = req.query.page;
    const limit = 50;
    const skip = (page - 1) * limit;
    const adds = await Add.find().skip(skip).limit(limit).populate('userId').lean();
    if (adds.length == 0) {
      return res.status(400).send({ date: adds, message: strings.NOT_FOUND, success: false });
    }
    return res.status(200).send({ date: adds, message: strings.FOUND_SUCCESSFULLY, success: true });
  } catch (error) {
    return res.status(500).send({ message: strings.SERVER_ERROR });
  }
};

const publishAdd = async (req, res) => {
  try {
    const { user, title, price, address, images, size, category, subCategory, phoneNumber } = req.body;
    const add = await Add.create({
      userId: user.userId,
      title,
      price,
      address,
      images,
      size,
      category,
      subCategory,
      phoneNumber
    });
    return res.status(200).send({ data: add, sucess: true, message: strings.ADD_CREATED_SUCCESSFULLY });
  } catch (error) {
    return res.status(500).send({ message: strings.SERVER_ERROR });
  }
};

const getAdd = async (req, res) => {
  try {

  } catch (error) {
    return res.status(500).send({ message: strings.SERVER_ERROR });
  }
};

const deleteAdd = async (req, res) => {
  try {
    const { id } = req.params;
    const res = await Add.findByIdAndDelete(id);
    if (res) {
      return res.status(200).send({ sucess: true, message: strings.DOCUMENT_DELETED });
    } else {
      return res.status(404).send({ sucess: false, message: strings.NO_DOCUMENT_FOUND });
    }
  } catch (error) {
    return res.status(500).send({ message: strings.SERVER_ERROR });
  }
};

const editAdd = async (req, res) => {
  try {
    const { title, price, address, images, size, category, subCategory, phoneNumber } = req.body;
    const { id } = req.params;
    const updateAdd = {};
    if (title)
      updateAdd.title = title;
    if (price)
      updateAdd.price = price;
    if (address)
      updateAdd.address = address;
    if (images)
      updateAdd.images = images;
    if (size)
      updateAdd.size = size;
    if (category)
      updateAdd.category = category;
    if (subCategory)
      updateAdd.subCategory = subCategory;
    if (phoneNumber)
      updateAdd.phoneNumber = phoneNumber;
    const res = await Add.findByIdAndUpdate(id, updateAdd, { new: true });
    if (res) {
      return res.status(200).send({ data: res, sucess: true, message: strings.DOCUMENT_UPDATED_SUCCESSFULLY });
    } else {
      return res.status(404).send({ sucess: false, message: strings.NO_DOCUMENT_FOUND });
    }
  } catch (error) {
    return res.status(500).send({ message: strings.SERVER_ERROR });
  }
};

const searchAdd = async (req, res) => {
  try {

  } catch (error) {
    return res.status(500).send({ message: strings.SERVER_ERROR });
  }
};

module.exports = { getAllAdds, publishAdd, editAdd, deleteAdd, getAdd, searchAdd }