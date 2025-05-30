let envelopes = [];

// envelope validation
const envelopeValidation = (envelope) => {
    if (!envelope.name || typeof envelope.name !== 'string' || envelope.name.trim() === '') {
        return false; // name must be a non-empty string
    }
    if (typeof envelope.budget !== 'number' || envelope.budget < 0) {
        return false; // budget must be a non-negative number
    }
    if(id === undefined) {
        return false; // id must be defined
    }
    return true; // valid envelope
}

// creates new envelopes
const createEnvelope = (name, budget) => {
    const newEnvelope = {
        id: envelopes.length + 1, // simple ID generation
        name: name,
        budget: budget,
        balance: budget // initial balance equals budget
    };

    // Validate the new envelope
    if (envelopeValidation(newEnvelope)) {
        envelopes.push(newEnvelope);
        return newEnvelope;
    }
}

//read envelopes

//reads envelope information

// update envelopes

// delete envelopes

envelopes = createEnvelope('Groceries', 500);