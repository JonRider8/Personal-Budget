// Updates main menu with envelope data
export const populateEnvelopeList = (envelopes) => {
    const envelopeList = document.getElementById('envelope-list');

    if (envelopes && envelopes.length > 0) {
        envelopes.forEach(envelope => {
            const envelopeItem = document.createElement('div');
            envelopeItem.className = 'envelope-item';
            envelopeItem.id = `envelope-${envelope._id}`;
            envelopeItem.setAttribute('data-id', envelope._id);
            envelopeItem.setAttribute('data-name', envelope._name);
            envelopeItem.setAttribute('data-balance', envelope.balance);
            envelopeItem.innerHTML = `
                <h3>${envelope._name.toUpperCase()}</h3>
                <p data-balance="${envelope.balance}">Balance: $${envelope.balance.toFixed(2)}</p>
                <p>Budget: $${envelope._budget.toFixed(2)}</p>
                <div class="envelope-actions">
                    <button class="update-envelope-button" data-id="${envelope._id}" data-name="${envelope._name}">Update</button>
                    <button class="view-transactions-button" data-id="${envelope._id}" data-name="${envelope._name}">View Transactions</button>
                    <button class="delete-envelope-button" data-id="${envelope._id}" data-name="${envelope._name}">Delete</button>
                </div>
            `;
            // Add event listeners for buttons
            envelopeList.appendChild(envelopeItem);
        })
    }
}