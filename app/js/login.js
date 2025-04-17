export function HandleLogin(){
    const app = document.getElementById('app')
    if (app){
        app.innerHTML = /*html*/`
        <form id="loginForm">
            <h2>Login</h2>
            <input type="text" id="identifier" placeholder="Username or Email" required />
            <input type="password" id="password" placeholder="Password" required />
            <button type="submit">Login</button>
            <div id="error"></div>
        </form>
        `
    }
    login()
}

function login(){
const form = document.getElementById('loginForm');
const errorDiv = document.getElementById('error');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const identifier = document.getElementById('identifier').value;
  const password = document.getElementById('password').value;
  const credentials = btoa(`${identifier}:${password}`);

  try {
    const response = await fetch('https://learn.zone01oujda.ma/api/auth/signin', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${credentials}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Invalid username/email or password');
    }

    const jwt = await response.text();
    localStorage.setItem('jwt', jwt);
    window.location.href = '/'; // Redirect after login

  } catch (err) {
    errorDiv.textContent = err.message;
  }
});
}