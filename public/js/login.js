const loginSubmit = document.getElementById('loginSubmit');
const signupSubmit = document.getElementById('signupSubmit');

const loginFormHandler = async () => {
    const email = document.querySelector('#loginEmail').value.trim();
    const password = document.querySelector('#loginPassword').value.trim();
  
    if (email && password) {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ email: email, password: password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to log in.');
      }
    }
  };
  
  const signupFormHandler = async () => {
  
    const username = document.querySelector('#signupUsername').value.trim();
    const email = document.querySelector('#signupEmail').value.trim();
    const password = document.querySelector('#signupPassword').value.trim();
  
    if (username && email && password) {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ name: username,email: email, password: password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to sign up.');
      }
    }
  };
  
loginSubmit.addEventListener('click', (event)=>{
  event.preventDefault();
  loginFormHandler()
} );
signupSubmit.addEventListener('click', (event)=>{
  event.preventDefault();
  signupFormHandler();
} );