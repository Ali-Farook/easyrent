const express = require('express');
const { getAllAdds, deleteAdd, getAdd, editAdd, publishAdd, searchAdd, uploadHeroImage } = require('../../controllers/adds/place-add');
const multer = require('multer');
const { verifyToken } = require('../../middlewares/Token-validate');
const { validate } = require('../../middlewares/validations/validation');
const { addSchema } = require('../../middlewares/validations/validation-schemas');
const router = express.Router();
const app = express();
const upload = multer();

// app.use(verifyToken);

router.route('/').get(getAllAdds);
router.route('/upload_hero').post(upload.single('heroImage'), uploadHeroImage);
router.route('/publish_add').post(validate(addSchema), verifyToken, publishAdd);
router.route('/deleteAdd/:id').delete(verifyToken, deleteAdd).get(getAdd)
router.route('/editAdd/:id').put(verifyToken, editAdd);

// http://localhost:3000/page?page=${page}
router.route('/search_add').get(searchAdd);

module.exports = router;