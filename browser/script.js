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
    const allEnvelopes = document.getElementById('all-envelopes');
    const envelopeList = document.getElementById('envelope-list');

    if (envelopes && envelopes.length > 0) {
        envelopes.forEach(envelope => {
            console.log('envelope in populateEnvelopeList:', envelope);
            const envelopeItem = document.createElement('div');
            envelopeItem.className = 'envelope-item';
            envelopeItem.innerHTML = `
                <h3>${envelope._name}</h3>
                <p>Balance: ${envelope.balance.toFixed(2)}</p>
                <p>Budget: ${envelope._budget.toFixed(2)}</p>
                <button class="view-transactions" data-id="${envelope.id}">View Transactions</button>
                <button class="edit-envelope" data-id="${envelope.id}">Edit</button>
                <button class="delete-envelope" data-id="${envelope.id}">Delete</button>
                `;
            envelopeList.appendChild(envelopeItem);
        })
    }
}

fetchEnvelopeData().then(envelopeData => { 
   const addEnvelopeButton = document.getElementById('add-envelope');
   const submitEnvelopeButton = document.getElementById('submit-envelope');
   const backToEnvelopesButton = document.getElementById('back-to-envelopes')

   // Event listeners for add envelope button
   addEnvelopeButton.addEventListener('click', () => {
       const allEnvelopes = document.getElementById('all-envelopes');
       allEnvelopes.style.display = 'none';
       const newEnvelopeForm = document.getElementById('new-envelope'); 
       newEnvelopeForm.style.display = 'block'; 
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