// Updates main menu with envelope data
export const populateEnvelopeList = (envelopes) => {
    const envelopeList = document.getElementById('envelope-list');

    if (envelopes && envelopes.length > 0) {
        envelopes.forEach(envelope => {
            const envelopeItem = document.createElement('div');
            envelopeItem.className = 'envelope-item';
            envelopeItem.id = `envelope-${envelope._id}`;
            envelopeItem.innerHTML = `
                <h3>${envelope._name.toUpperCase()}</h3>
                <p>Balance: ${envelope.balance.toFixed(2)}</p>
                <p>Budget: ${envelope._budget.toFixed(2)}</p>
                <div class="envelope-actions">
                    <button class="update-envelope-button" data-id="${envelope._id}">Update</button>
                    <button class="view-transactions-button" data-id="${envelope._id}">View Transactions</button>
                    <button class="delete-envelope-button" data-id="${envelope._id}">Delete</button>
                </div>
            `;
            // Add event listeners for buttons
            envelopeList.appendChild(envelopeItem);
        })
    }
}