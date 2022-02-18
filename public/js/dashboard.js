const newFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#project-name').value.trim();
    const description = document.querySelector('#project-funding').value.trim();
  
    if (title && description) {
      const response = await fetch(`/api/eventRoutes`, {
        method: 'POST',
        body: JSON.stringify({ title, description }),
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