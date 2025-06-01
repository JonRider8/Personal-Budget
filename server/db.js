let envelopes = [];
let nextId = 1;

// envelope validation
const envelopeValidation = (envelope) => {
    if (!envelope._name || typeof envelope._name !== 'string' || envelope._name.trim() === '') {
        console.log("Invalid envelope name:", envelope._name);
        return false; // name must be a non-empty string
    }
    if (typeof envelope._budget !== 'number' || envelope._budget < 0) {
        console.log("Budget type is:", typeof envelope._budget);
        return false; // budget must be a non-negative number
    }
    if(envelope._id === undefined) {
        console.log("Invalid envelope ID:", envelope._id);
        return false; // id must be defined
    }
    if (typeof envelope.balance !== 'number' || envelope.balance < 0) {
        console.log("Invalid envelope balance:", envelope.balance);
        return false; // balance must be a non-negative number
    }
    return true; // valid envelope
}

// creates new envelopes
const createEnvelope = (envelope) => {
    // Validate the new envelope
    const newEnvelope = {
        _id: nextId++, // simple ID generation
        _name: envelope.name,
        _budget: envelope.budget, // ensure budget is a number
        balance: envelope.budget, // initial balance equals budget
        transactions: [envelope.budget] // initialize transactions as an empty array
    };
    
    if (envelopeValidation(newEnvelope)) {
        envelopes.push(newEnvelope);
        return newEnvelope;
    }else {
        throw new Error('Invalid envelope data.');
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
    if(id > 0){ 
        const envelopeToUpdate = getEnvelopeById(id);
        if (envelopeToUpdate) {
            // + or - followed by a number
            const firstChar = updatedBudget.charAt(0);
            switch (firstChar) {
                case '+':
                    envelopeToUpdate.balance += parseFloat(updatedBudget.slice(1));
                    envelopeToUpdate.transactions.push(envelopeToUpdate.balance); // add to transactions
                    break;
                case '-':
                    envelopeToUpdate.balance -= parseFloat(updatedBudget.slice(1));
                    if (envelopeToUpdate.balance < 0) {
                        throw new Error('Insufficient balance. Cannot deduct more than the current balance.');
                    }
                    envelopeToUpdate.transactions.push(envelopeToUpdate.balance); // add to transactions
                    break;
                default:
                    throw new Error('Invalid budget update format. Use + or - followed by a number.');
            }
        } else {
            throw new Error('Envelope not found');
        }
    }
}

// get envelope by ID transactions
const getEnvelopeTransactions = (id) => {
    const envelope = getEnvelopeById(id);
    if (envelope) {
        return envelope.transactions;
    }
    throw new Error('Envelope not found');
}

// delete envelopes
const deleteEnvelope = (id) => {
     const index = envelopes.findIndex(envelope => envelope._id === id);
    if (index !== -1) {
        envelopes.splice(index, 1);
        return true; // successfully deleted
    }
    throw new Error('Envelope not found');
}

module.exports = {
    createEnvelope,
    getAllEnvelopes,
    getEnvelopeById,
    updateEnvelope,
    deleteEnvelope,
    getEnvelopeTransactions
};