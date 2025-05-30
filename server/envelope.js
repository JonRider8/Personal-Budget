const envelopeRouter = require('express').Router();

module.exports = envelopeRouter;

const e = require('express');
const {
    createEnvelope,
    getAllEnvelopes,
    getEnvelopeById,
    updateEnvelope,
    deleteEnvelope
} = require('./db.js');

envelopeRouter.param('id', (req, res, next, id) => {
    const envelope = getEnvelopeById(parseInt(id, 10));
    if (envelope) {
        req.envelope = envelope;
        next();
    } else {
        res.status(404).send('Envelope not found');
    }
});

envelopeRouter.get('/', (req, res) => {
  res.send(getAllEnvelopes());
});

envelopeRouter.post('/', (req, res) => {
    const envelope = req.body;
    try {
        const newEnvelope = createEnvelope(envelope);
        res.status(201).send(newEnvelope);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

envelopeRouter.get('/:id', (req, res) => {
    res.send(req.envelope);
});

envelopeRouter.put('/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const updatedBudget = req.body.budget;
    try {
        updateEnvelope(id, updatedBudget);
        res.send(req.envelope);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

envelopeRouter.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    try {
        deleteEnvelope(id);
        res.status(204).send(); // No content
    } catch (error) {
        res.status(400).send(error.message);
    }
});