export const submitEnvelope = (envelopeData) => {
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
    }