const { z } = require('zod');

const validate = (Schema) => async (req, res, next) => {
   try {
      const body = await Schema.parseAsync(req.body);
      req.body = body;
      next();
   } catch (error) {
      const message = error.errors[0].message;
      return res.status(400).send({ success: false, message });
   }
}

module.exports = { validate };
