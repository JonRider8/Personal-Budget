export const updateEnvelope = (currentEnvelopeId) => {
    const radioButtons = document.getElementsByName('update-type');
        const updateAmount = document.getElementById('update-envelope-amount').value;
        const updateAmountStr = updateAmount.toString();
        let updateType = '';

        for(let i = 0; i < updateAmountStr.length; i++) {
            if (updateAmountStr[i] === '.') {
                let decimalPart = updateAmountStr.split('.')[1];
                if (decimalPart && decimalPart.length > 2) {
                    alert(`Please enter an amount with no more than two decimal places. 
                        Nearest values is ${Math.floor(updateAmount * 100) / 100} or ${Math.ceil(updateAmount * 100) / 100 }.`);
                    return;
                }
            }
            if (updateAmountStr[i] === '$') {
                updateAmountStr = updateAmountStr.replace('$', '');
            }
            if (updateAmountStr[i] === ',') {
                updateAmountStr = updateAmountStr.replace(',', '');
            }
            if (updateAmountStr[i] === ' ') {
                updateAmountStr = updateAmountStr.replace(' ', '');
            }
        }

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