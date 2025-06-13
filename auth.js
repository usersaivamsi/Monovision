const SERVER_URL = 'http://localhost:3000'; // Update if hosted elsewhere

function toggleForms() {
    document.getElementById('loginForm').classList.toggle('hidden');
    document.getElementById('signupForm').classList.toggle('hidden');
}

// Redirect to events page if already logged in
if (localStorage.getItem('currentUser') && window.location.pathname === '/index.html') {
    window.location.href = 'events.html';
}

// Handle Login
async function handleLogin(event) {
    event.preventDefault();

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    try {
        const res = await fetch(`${SERVER_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        if (res.ok) {
            localStorage.setItem('currentUser', JSON.stringify(data.user));
            window.location.href = 'events.html';
        } else {
            alert(data.message || 'Login failed');
        }
    } catch (error) {
        console.error('Login error:', error);
        alert('Server error. Please try again later.');
    }
}

// Handle Signup
async function handleSignup(event) {
    event.preventDefault();

    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const mobile = document.getElementById('signup-mobile').value;
    const password = document.getElementById('signup-password').value;

    try {
        const res = await fetch(`${SERVER_URL}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, mobile, password })
        });

        const data = await res.json();

        if (res.ok) {
            localStorage.setItem('currentUser', JSON.stringify(data.user));
            window.location.href = 'events.html';
        } else {
            alert(data.message || 'Signup failed');
        }
    } catch (error) {
        console.error('Signup error:', error);
        alert('Server error. Please try again later.');
    }
}
