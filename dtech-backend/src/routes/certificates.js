const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/certificatesController');
const auth = require('../middleware/authMiddleware');
const upload = require('../config/multer');

router.get('/', ctrl.getAll);

router.post('/', auth, upload.single('image'), ctrl.create);
router.put('/:id', auth, upload.single('image'), ctrl.update);
router.delete('/:id', auth, ctrl.remove);

module.exports = router;
