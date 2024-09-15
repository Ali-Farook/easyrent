const express = require('express');
const { getAllAdds, deleteAdd, getAdd, editAdd, publishAdd, searchAdd } = require('../../controllers/adds/place-add');
const { verifyToken } = require('../../middlewares/Token-validate');
const router = express.Router();
const app = express();

// app.use(verifyToken);

router.route('/').get(getAllAdds);
router.route('/publish_add').post(verifyToken, publishAdd);
router.route('/deleteAdd/:id').delete(verifyToken, deleteAdd).get(getAdd)
router.route('/editAdd/:id').put(verifyToken, editAdd);

// http://localhost:3000/page?page=${page}
router.route('/search_add').get(searchAdd);

module.exports = router;