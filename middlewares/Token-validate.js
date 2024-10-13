const jwt = require('jsonwebtoken');
const { strings } = require('../utils/constants');
require('dotenv').config();

const verifyToken = (req, res, next) => {
   try {
      const authHeader = req.headers['authorization'];
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
         return res.status(401).json({ message: strings.INVALID_TOKEN });
      }
      const token = authHeader.split(' ')[1]
      const decode = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
      req.body.user = {};
      req.body.user = decode;
      next();
   } catch (error) {
      console.log('Token error', error)
      return error;
   }
}

module.exports = { verifyToken };