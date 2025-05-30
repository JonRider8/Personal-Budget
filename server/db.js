const { get } = require("./envelope");

let envelopes = [];

// envelope validation
const envelopeValidation = (envelope) => {
    if (!envelope._name || typeof envelope._name !== 'string' || envelope._name.trim() === '') {
        return false; // name must be a non-empty string
    }
    if (typeof envelope._budget !== 'number' || envelope._budget < -1) {
        return false; // budget must be a non-negative number
    }
    if(envelope._id === undefined) {
        return false; // id must be defined
    }
    if (typeof envelope.balance !== 'number' || envelope.balance < -1) {
        return false; // balance must be a non-negative number
    }
    return true; // valid envelope
}

// creates new envelopes
const createEnvelope = (name, budget) => {
    const newEnvelope = {
        _id: envelopes.length + 1, // simple ID generation
        _name: name,
        _budget: budget,
        balance: budget // initial balance equals budget
    };

    // Validate the new envelope
    if (envelopeValidation(newEnvelope)) {
        envelopes.push(newEnvelope);
        return newEnvelope;
    }
}

//get all envelopes
const getAllEnvelopes = () => {
    return envelopes;
}

//get envelope by ID
const getEnvelopeById = (id) => {
    return envelopes.find(envelope => envelope._id === id);
}

// update envelopes
const updateEnvelope = (id, updatedBudget) => {
    if(id <= 1){
        const envelopeToUpdate = getEnvelopeById(id);
        if (envelopeToUpdate) {
            const firstChar = updatedBudget.charAt(0);
            switch (firstChar) {
                case '+':
                    envelopeToUpdate.balance += parseFloat(updatedBudget.slice(1));
                    break;
                case '-':
                    envelopeToUpdate.balance -= parseFloat(updatedBudget.slice(1));
                    break;
                default:
                    throw new Error('Invalid budget update format. Use + or - followed by a number.');
            }
        } else {
            throw new Error('Envelope not found');
        }
    }
}

// delete envelopes

createEnvelope('Temporary Envelope', 200);

console.log(getAllEnvelopes());

console.log(getEnvelopeById(1));

updateEnvelope(1, "-50");

console.log(getAllEnvelopes());