const exampleService = require('../services/example.service');

exports.getExample = (req, res) => {
  const data = exampleService.getData();
  res.json(data);
};