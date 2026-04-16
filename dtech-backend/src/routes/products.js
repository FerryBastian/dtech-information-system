const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/productsController');
const auth = require('../middleware/authMiddleware');
const upload = require('../config/multer');

router.get('/', ctrl.getAll);
router.get('/featured', ctrl.getFeatured);
router.get('/:id', ctrl.getOne);

router.post('/', auth, upload.single('image'), ctrl.create);
router.put('/:id', auth, upload.single('image'), ctrl.update);
router.delete('/:id', auth, ctrl.remove);
router.post('/:id/images', auth, upload.single('image'), ctrl.addImage);
router.delete('/images/:imageId', auth, ctrl.removeImage);

module.exports = router;
