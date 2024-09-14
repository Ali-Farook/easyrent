const User = require('../../models/user/user.model');
const { strings } = require('../../utils/constants');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const signUpController = async (req, res) => {
   try {
      const { firstName, lastName, email, password } = req.body;
      const isUserExist = await User.findOne({ email: email });
      if (isUserExist) {
         return res.status(406).send({ message: strings.ALREADY_EXISTED });
      }
      const user = await User.create({ firstName, lastName, email, password });
      const tokenPaylod = {
         userId: user._id
      };
      const token = jwt.sign(tokenPaylod, process.env.TOKEN_SECRET_KEY, { expiresIn: '6h' });
      return res.status(200).send({ data: user, message: strings.USER_CREATED, token });
   } catch (error) {
      return res.status(500).send({ message: strings.SERVER_ERROR });
   }
}

const loginController = async (req, res) => {
   try {
      const { email, password } = req.body;
      console.log('emaiil', email)
      const user = await User.findOne({ email: email });
      if (user) {
         if (user.password != password) {
            return res.status(400).send({ message: strings.SERVER_ERROR });
         }
         const tokenPaylod = {
            userId: user._id
         };
         const token = jwt.sign(tokenPaylod, process.env.TOKEN_SECRET_KEY, { expiresIn: '12h' });
         return res.status(200).send({ data: user, message: strings.LOGIN_SUCCESS, token });
      } else {
         return res.status(404).send({ message: strings.NOT_FOUND });
      }
   } catch (error) {
      return res.status(500).send({ message: strings.SERVER_ERROR });
   }
}

module.exports = {
   signUpController,
   loginController
}