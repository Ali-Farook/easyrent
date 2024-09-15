const { signUpController, loginController } = require('../../controllers/auth/auth');
const { validate } = require('../../middlewares/validations/validation');
const { userSchema } = require('../../middlewares/validations/validation-schemas');
const express = require('express');
const router = express.Router();

router.route('/signup').post(validate(userSchema), signUpController);
router.route('/login').post(loginController);

module.exports = router;