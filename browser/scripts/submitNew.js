export const submitEnvelope = (envelopeData) => {
    const envelopeName = document.getElementById('envelope-name').value;
        const envelopeBudget = document.getElementById('envelope-amount').value;
        let budgetStr = envelopeBudget.toString();

        for(let i = 0; i < budgetStr.length; i++) {
            if (budgetStr[i] === '.') {
                let decimalPart = budgetStr.split('.')[1];
                if (decimalPart && decimalPart.length > 2) {
                    alert(`Please enter an amount with no more than two decimal places. 
                        Nearest values is ${Math.floor(envelopeBudget * 100) / 100} or ${Math.ceil(envelopeBudget * 100) / 100 }.`);
                    return;
                }
            }
            if (budgetStr[i] === '$') {
                budgetStr = budgetStr.replace('$', '');
            }
            if (budgetStr[i] === ',') {
                budgetStr = budgetStr.replace(',', '');
            }
            if (budgetStr[i] === ' ') {
                budgetStr = budgetStr.replace(' ', '');
            }
        }
    
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
            if (!envelopeName) {
                alert('Please enter an envelope name.');
            }else if (!envelopeBudget) {
                alert('Please enter an envelope budget.');
            }
            return;
        }
    }