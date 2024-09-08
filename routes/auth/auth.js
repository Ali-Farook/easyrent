const { signUpController, loginController } = require('../../controllers/auth/auth');
const { signUpValidation } = require('../../middlewares/validations/user-validation');
const express = require('express');
const router = express.Router();

router.route('/signup').post(signUpValidation, signUpController);
router.route('/login').post(loginController);

module.exports = router;