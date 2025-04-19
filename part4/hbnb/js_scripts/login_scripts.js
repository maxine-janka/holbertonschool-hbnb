document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
  
    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            // Your code to handle form submission
            let email = document.getElementById('email');
            let password = document.getElementById('password');

            alert('This form has been successfully submitted!');
            console.log(`This form has a username of ${email.value} and password of ${password.value}`);
        });
    }
  });
