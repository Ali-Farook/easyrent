const Agency = require('../../models/agency/agency.modal');
const User = require('../../models/user/user.model');
const { strings } = require('../../utils/constants');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const signUpController = async (req, res) => {
   try {
      const { firstName, lastName, email, password } = req.body;
      console.log(password)
      const isUserExist = await User.findOne({ email: email });
      if (isUserExist) {
         return res.status(406).send({ success: false, message: strings.ALREADY_EXISTED });
      }
      const user = await User.create({ firstName, lastName, email, password });
      const tokenPaylod = {
         userId: user._id
      };
      const token = jwt.sign(tokenPaylod, process.env.TOKEN_SECRET_KEY, { expiresIn: '6h' });
      return res.status(200).send({ success: true, data: user, message: strings.USER_CREATED, token });
   } catch (error) {
      return res.status(500).send({ success: false, message: strings.SERVER_ERROR });
   }
}

const loginController = async (req, res) => {
   try {
      const { email, password } = req.body;
      const user = await User.findOne({ email: email });
      if (user) {
         if (user.password != password) {
            return res.status(400).send({ success: false, message: strings.SERVER_ERROR });
         }
         const tokenPaylod = {
            userId: user._id
         };
         const token = jwt.sign(tokenPaylod, process.env.TOKEN_SECRET_KEY, { expiresIn: '12h' });
         const agency = await Agency.find({ userId: user._id });
         if (!agency) {
            agency = {}
         }
         return res.status(200).send({ success: true, data: { user, agencies: agency }, message: strings.LOGIN_SUCCESS, token });
      } else {
         return res.status(404).send({ success: false, message: `User ${strings.NOT_FOUND}` });
      }
   } catch (error) {
      return res.status(500).send({ success: false, message: strings.SERVER_ERROR });
   }
}

module.exports = {
   signUpController,
   loginController
}