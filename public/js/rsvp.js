const registerButton = document.getElementById('registerButton');
const eventId = document.getElementById('eventId').textContent;
const userId = document.getElementById('userId');

userId.style.display = 'none';


const rsvpQuery = async () => {
    const response = await fetch('/api/rsvp', {
        method: 'POST',
        body: JSON.stringify({ event_id: eventId, user_id: userId.textContent }),
        headers: { 'Content-Type': 'application/json' },
      });
}

registerButton.addEventListener('click', (event)=>{
    event.preventDefault();
    rsvpQuery();
})