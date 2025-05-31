const fetchEnvelopeData = async () => {
    try {
        const response = await fetch('/server/envelope');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching envelope data:', error);
    }
}

fetchEnvelopeData().then(envelopeData => { 
   const addEnvelopeButton = document.getElementById('add-envelope');
   const submitEnvelopeButton = document.getElementById('submit-envelope');
   const backToEnvelopesButton = document.getElementById('back-to-envelopes');

   addEnvelopeButton.addEventListener('click', () => {
       const allEnvelopes = document.getElementById('all-envelopes');
       allEnvelopes.style.display = 'none';
       const newEnvelopeForm = document.getElementById('new-envelope'); 
       newEnvelopeForm.style.display = 'block'; 
   });

   submitEnvelopeButton.addEventListener('click', () => {
       const envelopeName = document.getElementById('envelope-name').value;
       const envelopeAmount = document.getElementById('envelope-amount').value;

       if (envelopeName && envelopeBudget) {
           fetch('/server/envelope', {
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
});