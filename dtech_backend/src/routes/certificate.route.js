const express = require('express');

const certificateController = require('../controllers/certificateController');
const certificateUpload = require('../middleware/certificateUpload');

const router = express.Router();

router.get('/certificates', certificateController.getAllCertificates);
router.get('/certificates/:id/image', certificateController.getCertificateImage);
router.get('/certificates/:id', certificateController.getCertificateById);
router.post('/certificates', certificateUpload.single('image'), certificateController.createCertificate);
router.put('/certificates/:id', certificateUpload.single('image'), certificateController.updateCertificate);
router.delete('/certificates/:id', certificateController.deleteCertificate);

module.exports = router;
