export const viewTransactions = (event) => {
    const envelopeId = event.target.getAttribute('data-id');

    fetch(`/api/envelope/${envelopeId}/transactions`)
        .then(response => response.json())
        .then(transactions => {

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
}