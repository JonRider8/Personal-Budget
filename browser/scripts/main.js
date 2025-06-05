import { populateEnvelopeList } from './populateEnvelopeList.js';
import { submitEnvelope } from './submitNew.js';
import { viewTransactions } from './transactions.js';
import { updateEnvelope } from './submitUpdate.js';
import { deleteEnvelope } from './deleteEnvelope.js';

// Fetch envelope data from the server
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

// Show and hide sections
const hideShow = (section1, section2) => {
    section1.style.display = 'none';
    section2.style.display = 'flex'; 
    
    const h2 = section2.querySelector('h2');
    const envelopeName = section2.getAttribute('data-name') || '';
    
    if(section2.id === 'envelope-details') {
        h2.textContent = `${envelopeName} Transaction History`;
    } else if(section2.id === 'update-envelope') {
        h2.textContent = `Update ${envelopeName} Envelope`;
    }
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

    // Initialize current envelope ID for submit update
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
    
    // Populate the envelope list
    populateEnvelopeList(envelopeData);


    // These have to go after the envelopes are populated
    const viewTransactionsButtons = document.getElementsByClassName('view-transactions-button');
    const updateEnvelopeButtons = document.getElementsByClassName('update-envelope-button');
    const deleteEnvelopeButtons = document.getElementsByClassName('delete-envelope-button');

    // update envelope
    Array.from(updateEnvelopeButtons).forEach(button => {
        button.addEventListener('click', (event) => {
            const envelopeName = button.getAttribute('data-name');
            updateEnvelopeForm.setAttribute('data-name', envelopeName);

            currentEnvelopeId = event.target.getAttribute('data-id');
            hideShow(allEnvelopes, updateEnvelopeForm);
        });
    });
    
    submitUpdateButton.addEventListener('click', () => {
        updateEnvelope(currentEnvelopeId);
    });
    
    // Transaction view
    Array.from(viewTransactionsButtons).forEach(button => {
        button.addEventListener('click', (event) => {
            const envelopeName = button.getAttribute('data-name');
            envelopeDetails.setAttribute('data-name', envelopeName);

            hideShow(allEnvelopes, envelopeDetails);

            event.preventDefault();
            viewTransactions(event)
        });
    })

    // delete envelope
    Array.from(deleteEnvelopeButtons).forEach(button => {
        button.addEventListener('click', (event) => {
            deleteEnvelope(event);
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