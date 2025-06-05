import { populateEnvelopeList } from './populateEnvelopeList.js';
import { submitEnvelope } from './submitNew.js';
import { viewTransactions } from './transactions.js';

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

const hideShow = (section1, section2) => {
    section1.style.display = 'none';
    section2.style.display = 'flex'; 
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
        hideShow(allEnvelopes, newEnvelopeForm); 
    });
    
    // Submit new envelopes button
    submitEnvelopeButton.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent form submission/reload
        submitEnvelope(envelopeData);
    });
    
    populateEnvelopeList(envelopeData);

    // These have to go after the envelopes are populated

    const viewTransactionsButtons = document.getElementsByClassName('view-transactions-button');
    const updateEnvelopeButtons = document.getElementsByClassName('update-envelope-button');
    const deleteEnvelopeButtons = document.getElementsByClassName('delete-envelope-button');

    // Transaction view
    Array.from(viewTransactionsButtons).forEach(button => {
        button.addEventListener('click', (event) => {
            hideShow(allEnvelopes, envelopeDetails);

            event.preventDefault();
            viewTransactions(event)
            });
        })
    
    // update envelope
    Array.from(updateEnvelopeButtons).forEach(button => {
        button.addEventListener('click', (event) => {
            currentEnvelopeId = event.target.getAttribute('data-id');
            hideShow(allEnvelopes, updateEnvelopeForm);
        });
    });
    

    submitUpdateButton.addEventListener('click', () => {
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
    });

    // delete envelope
    Array.from(deleteEnvelopeButtons).forEach(button => {
        button.addEventListener('click', (event) => {
            const envelopeId = event.target.getAttribute('data-id');
            if (confirm('Are you sure you want to delete this envelope?')) {
                fetch(`/api/envelope/${envelopeId}`, {
                    method: 'DELETE'
                })
                .then(response => {
                    if (response.ok) {
                        window.location.reload();
                    } else {
                        throw new Error('Failed to delete envelope');
                    }
                })
                .catch(error => console.error('Error deleting envelope:', error));
            }
        });
    });

    // back to envelopes button
    backToEnvelopesButtons.forEach(button => {
        button.addEventListener('click', () => {

            switch (button.id) {
                case 'back-to-envelopes-from-details':
                    showHide(envelopeDetails, allEnvelopes);
                    break;
                case 'back-to-envelopes-from-new':
                    showHide(newEnvelopeForm, allEnvelopes);
                    break;
                case 'back-to-envelopes-from-update':
                    showHide(updateEnvelopeForm, allEnvelopes);
                    break;
            }
            window.location.reload();
        });
    });
});