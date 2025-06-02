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
                    <button class="update-envelope" data-id="${envelope._id}">Update</button>
                    <button class="view-transactions" data-id="${envelope._id}">View Transactions</button>
                    <button class="delete-envelope" data-id="${envelope._id}">Delete</button>
                </div>
            `;
            // Add event listeners for buttons
            envelopeList.appendChild(envelopeItem);
        })
    }
}

fetchEnvelopeData().then(envelopeData => { 
    const addEnvelopeButton = document.getElementById('add-envelope');
    const submitEnvelopeButton = document.getElementById('submit-envelope');
    const backToEnvelopesButton = document.getElementById('back-to-envelopes');
    
    const allEnvelopes = document.getElementById('all-envelopes');
    const newEnvelopeForm = document.getElementById('new-envelope'); 
    const envelopeDetails = document.getElementById('envelope-details');
    
    // Event listeners for add envelope button
    addEnvelopeButton.addEventListener('click', () => {
        allEnvelopes.style.display = 'none';
        newEnvelopeForm.style.display = 'flex'; 
    });
    
    // Event listener for submit new envelopes button
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
                console.log('Envelope created:', data);
                window.location.reload();
            })
            .catch(error => console.error('Error creating envelope:', error));
        } else {
            alert('Please fill in all fields.');
        }
    });
    
    populateEnvelopeList(envelopeData);

    // These have to go after the envelopes are populated

    const viewTransactionsButtons = document.getElementsByClassName('view-transactions');
    const editEnvelopeButtons = document.getElementsByClassName('update-envelope');
    const deleteEnvelopeButtons = document.getElementsByClassName('delete-envelope');

    if(viewTransactionsButtons && viewTransactionsButtons.length > 0) {
        Array.from(viewTransactionsButtons).forEach(button => {
            button.addEventListener('click', (event) => {
                const envelopeId = event.target.getAttribute('data-id');
                fetch(`/api/envelope/${envelopeId}/transactions`)
                    .then(response => response.json())
                    .then(transactions => {
                        console.log('Transactions:', transactions);
                        allEnvelopes.style.display = 'none';
                        envelopeDetails.style.display = 'flex'; 

                        const transactionList = document.getElementById('transaction-list');
                        if(transactionList){
                            transactionList.innerHTML = ''; // Clear previous transactions
                        }
                        transactions.forEach(transaction => {
                            const transactionItem = document.createElement('div');
                            transactionItem.className = 'transaction-item';
                            transactionItem.innerHTML = `
                                <p>Transaction: ${transaction}</p>
                            `;
                            console.log('Transaction Item:', transactionItem);
                            transactionList.appendChild(transactionItem);
                        });
                    }).catch(error => console.error('Error fetching transactions:', error));
            });
        })
    }
});