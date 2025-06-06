export const deleteEnvelope = (event) => {
    const envelopeId = event.target.getAttribute('data-id');
    const envelopeName = event.target.getAttribute('data-name');
    
    if (confirm(`Are you sure you want to delete the envelope "${envelopeName}"? This action cannot be undone.`)) {
        fetch(`/api/envelope/${envelopeId}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                // Remove the envelope from the UI
                const envelopeItem = document.getElementById(`envelope-${envelopeId}`);
                if (envelopeItem) {
                    envelopeItem.remove();
                }
            } else {
                throw new Error('Failed to delete envelope');
            }
        })
        .catch(error => console.error('Error deleting envelope:', error));
    }
}