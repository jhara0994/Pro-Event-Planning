const eventSubmit = document.getElementById('eventSubmit');
const userId = document.getElementById('userId');
userId.style.display = 'none';
const newFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.getElementById('eventTitle').value.trim();
    const description = document.getElementById('eventDescription').value.trim();
    const date = document.getElementById('eventDate').value.trim();
    const city = document.getElementById('eventCity').value.trim();
    const state = document.getElementById('eventState').value.trim();
    const fee = document.getElementById('eventFee').value.trim();
    

    if (title && description && date && city && state) {
      const response = await fetch(`/api/events`, {
        method: 'POST',
        body: JSON.stringify({ 
            title: title, 
            event_description: description,
            event_date: date,
            location_city: city,
            location_state: state,
            fee: fee,
            user_id: userId.textContent
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to create event');
      }
    }
  };

  eventSubmit.addEventListener('click', newFormHandler);