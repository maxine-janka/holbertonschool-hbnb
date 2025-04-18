document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
  
    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            // Your code to handle form submission
            let username = document.getElementById('username');
            let password = document.getElementById('password');
  
            if (username.value == '' || password.value == '') {
                alert('username or password empty');
            } else {
                alert('This form has been successfully submitted!');
                console.log(`This form has a username of ${username.value} and password of ${password.value}`
            );
            }
        });
    }
  });

  async function loginUser(email, password) {
    const response = await fetch('http://127.0.0.1:5000/api/v1/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });
    // Handle the response
    
    if (response.ok) {
        const data = await response.json();
        document.cookie = `token=${data.access_token}; path=/`;
        window.location.href = 'index.html';
    } else {
        alert('Login failed: ' + response.statusText);
    }
}
