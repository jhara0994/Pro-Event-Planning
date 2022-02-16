const eventHandler = async (event) => {
  event.preventDefault();

  // const eventTitle = document.querySelector('.event-title').value.trim();
  const eventId = event.target.dataset.eventid;
  // const eventDescription = document.querySelector('.event-desc').value.trim();

  if (eventId) {
    const response = await fetch(`/api/events/${eventId}`, {
      method: 'GET',
    });

    if (response.ok) {
      window.location.replace('/events');
    } else {
      alert('Failed to show project');
    }
  }
};

var selectors = document.querySelectorAll('.events-btn');
for(var i=0; i < selectors.length; i++) {
  selectors[i].addEventListener('click', eventHandler);
}

