const { createAgency, editAgency, deleteAgency } = require('../../controllers/agency/agency');
const { verifyToken } = require('../../middlewares/Token-validate');
const { validate } = require('../../middlewares/validations/validation');
const { agencySchema } = require('../../middlewares/validations/validation-schemas');
const express = require('express');
const router = express.Router();

router.route('/create_agency').post(validate(agencySchema), verifyToken, createAgency);
router.route('/delete_agency/:id').delete(verifyToken, deleteAgency);
router.route('/edit_agency').put(verifyToken, editAgency);

router.route('/add_review').post(() => { });

module.exports = router;