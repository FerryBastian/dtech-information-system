const certificateService = require('../services/certificateService');

exports.getAllCertificates = async (req, res) => {
  try {
    const includeInactive = req.query.includeInactive === 'true';
    const result = await certificateService.getAllCertificates({ includeInactive });
    res.json(result);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

exports.getCertificateById = async (req, res) => {
  try {
    const result = await certificateService.getCertificateById(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

exports.getCertificateImage = async (req, res) => {
  try {
    const result = await certificateService.getCertificateImage(req.params.id);

    if (result.image_mime_type) {
      res.type(result.image_mime_type);
    }
    res.setHeader('Cache-Control', 'public, max-age=86400');
    return res.send(result.image_data);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

exports.createCertificate = async (req, res) => {
  try {
    const result = await certificateService.createCertificate({ data: req.body, file: req.file });
    res.status(201).json({
      message: 'Certificate berhasil dibuat.',
      id: result.id,
    });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

exports.updateCertificate = async (req, res) => {
  try {
    await certificateService.updateCertificate(req.params.id, { data: req.body, file: req.file });
    res.json({ message: 'Certificate berhasil diperbarui.' });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

exports.deleteCertificate = async (req, res) => {
  try {
    await certificateService.softDeleteCertificate(req.params.id);
    res.json({ message: 'Certificate berhasil dihapus.' });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};
