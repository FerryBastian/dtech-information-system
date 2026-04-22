exports.uploadImage = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'File gambar wajib diunggah.' });
  }

  const filePath = `/uploads/${req.file.filename}`;

  res.status(201).json({
    message: 'Upload berhasil',
    path: filePath,
  });
};
