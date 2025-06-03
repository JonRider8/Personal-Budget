const fetchEnvelopeData = async () => {
    try {
        const response = await fetch('/api/envelope');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching envelope data:', error);
    }
}

// Updates main menu with envelope data
const populateEnvelopeList = (envelopes) => {
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

fetchEnvelopeData().then(envelopeData => { 
    //button elements
    const addEnvelopeButton = document.getElementById('add-envelope');
    const submitEnvelopeButton = document.getElementById('submit-envelope');
    const backToEnvelopesButtons = document.querySelectorAll('.back-to-envelopes');
    const submitUpdateButton = document.getElementById('submit-update');

    //section elements
    const allEnvelopes = document.getElementById('all-envelopes');
    const newEnvelopeForm = document.getElementById('new-envelope'); 
    const envelopeDetails = document.getElementById('envelope-details');
    const updateEnvelopeForm = document.getElementById('update-envelope');

    let currentEnvelopeId = null;
    
    // Add envelope button
    addEnvelopeButton.addEventListener('click', () => {
        allEnvelopes.style.display = 'none';
        newEnvelopeForm.style.display = 'flex'; 
    });
    
    // Submit new envelopes button
    submitEnvelopeButton.addEventListener('click', () => {
        const envelopeName = document.getElementById('envelope-name').value;
        const envelopeBudget = document.getElementById('envelope-amount').value;
    
        if (envelopeName && envelopeBudget) {
            fetch('/api/envelope', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: envelopeName, budget: parseFloat(envelopeBudget) })
            })
            .then(response => response.json())
            .then(data => {
                window.location.reload();
            })
            .catch(error => console.error('Error creating envelope:', error));
        } else {
            return;
        }
    });
    
    populateEnvelopeList(envelopeData);

    // These have to go after the envelopes are populated

    const viewTransactionsButtons = document.getElementsByClassName('view-transactions-button');
    const updateEnvelopeButtons = document.getElementsByClassName('update-envelope-button');
    const deleteEnvelopeButtons = document.getElementsByClassName('delete-envelope-button');

    // Transaction view
    if(viewTransactionsButtons && viewTransactionsButtons.length > 0) {
        Array.from(viewTransactionsButtons).forEach(button => {
            button.addEventListener('click', (event) => {
                const envelopeId = event.target.getAttribute('data-id');

                fetch(`/api/envelope/${envelopeId}/transactions`)
                    .then(response => response.json())
                    .then(transactions => {
                        allEnvelopes.style.display = 'none';
                        envelopeDetails.style.display = 'flex'; 

                        const transactionList = document.getElementById('transaction-list');
                        
                        // Clear previous transactions
                        if(transactionList){
                            transactionList.innerHTML = ''; 
                        }

                       for (let i = transactions.length - 1; i >= 0; i--) {
                           const transaction = transactions[i];
                           const transactionItem = document.createElement('div');
                           transactionItem.className = 'transaction-item';
                           if (i === 0) {
                               transactionItem.innerHTML = `<p>Initial Balance: ${transaction}</p>`;
                           } else {
                               transactionItem.innerHTML = `<p>Transaction: ${transaction}</p>`;
                           }
                           transactionList.appendChild(transactionItem);
                       }
                    });

            });

        })
    }
    
    // update envelope
    Array.from(updateEnvelopeButtons).forEach(button => {
        button.addEventListener('click', (event) => {
            currentEnvelopeId = event.target.getAttribute('data-id');
            allEnvelopes.style.display = 'none';
            updateEnvelopeForm.style.display = 'flex';
        });
    });
    

    submitUpdateButton.addEventListener('click', () => {
        const radioButtons = document.getElementsByName('update-type');
        const updateAmount = document.getElementById('update-envelope-amount').value;
        let updateType = '';

        console.log('Update amount:', updateAmount);
        radioButtons.forEach(radio => {
            if (radio.checked) {
                updateType = radio.value;
                console.log('Update type:', updateType);
            }
        });

        let formattedAmount = '';
        if (updateType === 'add') {
            formattedAmount = `+${parseFloat(updateAmount)}`;
        } else if (updateType === 'subtract') {
            formattedAmount = `-${parseFloat(updateAmount)}`;
        }

        if (updateType && updateAmount && currentEnvelopeId) {
            fetch(`/api/envelope/${currentEnvelopeId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ balance: formattedAmount })
            })
            .then(response => response.json())
            .then(data => {
                console.log('Envelope updated:', data);
                window.location.reload();
            })
            .catch(error => console.error('Error updating envelope:', error));
        } else {
            alert('Please select an update type and enter an amount.');
        }
    });

    // back to envelopes button
    backToEnvelopesButtons.forEach(button => {
        button.addEventListener('click', () => {
            envelopeDetails.style.display = 'none';
            newEnvelopeForm.style.display = 'none';
            updateEnvelopeForm.style.display = 'none';
            allEnvelopes.style.display = 'flex'; 
            window.location.reload();
        });
    });
});