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
            envelopeItem.id = `envelope-${envelope.id}`;
            envelopeItem.innerHTML = `
                <h3>${envelope._name.toUpperCase()}</h3>
                <p>Balance: ${envelope.balance.toFixed(2)}</p>
                <p>Budget: ${envelope._budget.toFixed(2)}</p>
                <div class="envelope-actions">
                    <button class="view-transactions" data-id="${envelope.id}">View Transactions</button>
                    <button class="edit-envelope" data-id="${envelope.id}">Edit</button>
                    <button class="delete-envelope" data-id="${envelope.id}">Delete</button>
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
   const viewTransactionsButton = document.getElementById('view-transactions');
   const editEnvelopeButton = document.getElementById('edit-envelope');
   const deleteEnvelopeButton = document.getElementById('delete-envelope');

   // Event listeners for add envelope button
   addEnvelopeButton.addEventListener('click', () => {
       const allEnvelopes = document.getElementById('all-envelopes');
       allEnvelopes.style.display = 'none';
       const newEnvelopeForm = document.getElementById('new-envelope'); 
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
});