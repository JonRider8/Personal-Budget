export const updateEnvelope = (currentEnvelopeId) => {
    const radioButtons = document.getElementsByName('update-type');
        const updateAmount = document.getElementById('update-envelope-amount').value;
        let updateType = '';

        radioButtons.forEach(radio => {
            if (radio.checked) {
                updateType = radio.value;
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
                window.location.reload();
            })
            .catch(error => console.error('Error updating envelope:', error));
        } else {
            alert('Please select an update type and enter an amount.');
        }
    }