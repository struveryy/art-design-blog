// Get modal elements
const loginModal = document.getElementById('loginModal');
const signupModal = document.getElementById('signupModal');

// Get buttons
const loginBtn = document.getElementById('loginBtn');
const signupBtn = document.getElementById('signupBtn');

// Get close spans
const closeLogin = document.getElementById('closeLogin');
const closeSignup = document.getElementById('closeSignup');

// Open modals
loginBtn.onclick = () => loginModal.style.display = "block";
signupBtn.onclick = () => signupModal.style.display = "block";

// Close modals
closeLogin.onclick = () => loginModal.style.display = "none";
closeSignup.onclick = () => signupModal.style.display = "none";

// Close when clicking outside the modal
window.onclick = function(event) {
  if (event.target == loginModal) loginModal.style.display = "none";
  if (event.target == signupModal) signupModal.style.display = "none";
}

// Backend URL
const BASE_URL = 'http://localhost:5000/api/auth';

// Handle Login Form
document.getElementById('loginForm').onsubmit = async function(e) {
    e.preventDefault();
    const email = this.querySelector('input[type="email"]').value;
    const password = this.querySelector('input[type="password"]').value;

    try {
        const res = await fetch(`${BASE_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await res.json();
        if (res.ok) {
            alert(`Welcome ${data.name}!`);
            loginModal.style.display = "none";
            // Optionally store token in localStorage for future use
            localStorage.setItem('token', data.token);
        } else {
            alert(data.error);
        }
    } catch (err) {
        console.error(err);
        alert('Something went wrong!');
    }
}

// Handle Signup Form
document.getElementById('signupForm').onsubmit = async function(e) {
    e.preventDefault();
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const password = this.querySelector('input[type="password"]').value;

    try {
        const res = await fetch(`${BASE_URL}/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        });
        const data = await res.json();
        if (res.ok) {
            alert('Signup successful! You can now login.');
            signupModal.style.display = "none";
        } else {
            alert(data.error);
        }
    } catch (err) {
        console.error(err);
        alert('Something went wrong!');
    }
}


