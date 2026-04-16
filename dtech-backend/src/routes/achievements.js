const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/achievementsController');
const auth = require('../middleware/authMiddleware');
const upload = require('../config/multer');

// Public
router.get('/', ctrl.getAll);
router.get('/featured', ctrl.getFeatured);
router.get('/:id', ctrl.getOne);

// Admin
router.post('/', auth, upload.single('image'), ctrl.create);
router.put('/:id', auth, upload.single('image'), ctrl.update);
router.delete('/:id', auth, ctrl.remove);
// Images
router.post('/:id/images', auth, upload.single('image'), ctrl.addImage);
router.delete('/images/:imageId', auth, ctrl.removeImage);
// Technologies
router.post('/:id/technologies', auth, upload.single('image'), ctrl.addTechnology);
router.delete('/technologies/:techId', auth, ctrl.removeTechnology);

module.exports = router;
