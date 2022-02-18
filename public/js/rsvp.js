const registerButton = document.getElementById('registerButton');
const eventId = document.getElementById('eventId');
const userId = document.getElementById('userId');

userId.style.display = 'none';
eventId.style.display = 'none';

const rsvpQuery = async () => {
    const response = await fetch('/api/rsvp', {
        method: 'POST',
        body: JSON.stringify({ event_id: eventId.textContent, user_id: userId.textContent }),
        headers: { 'Content-Type': 'application/json' },
      });
      location.reload();
}

registerButton.addEventListener('click', (event)=>{
    event.preventDefault();
    rsvpQuery();
})