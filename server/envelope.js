const envelopeRouter = require('express').Router();

module.exports = envelopeRouter;

envelopeRouter.get('/', (req, res) => {
  res.send('Welcome to the Envelope API');
});