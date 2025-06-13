// events.js
if (!localStorage.getItem('currentUser')) {
    window.location.href = 'index.html';
}

const currentUser = JSON.parse(localStorage.getItem('currentUser'));
document.getElementById('userName').textContent = currentUser.name;

function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}

const events = [
    { title: "Music Fest", location: "City Park", date: "2025-06-20" },
    { title: "Art Exhibition", location: "Art Gallery", date: "2025-06-25" },
    { title: "Movie Night", location: "Downtown Cinema", date: "2025-06-18" },
    { title: "Food Carnival", location: "Community Hall", date: "2025-06-30" },
    { title: "Tech Talk", location: "Community Hall", date: "2025-07-02" },
    { title: "Coding Marathon", location: "Innovation Lab", date: "2025-07-10" },
    { title: "Cultural Fest", location: "Convention Center", date: "2025-07-15" },
    { title: "Startup Pitch", location: "Convention Center", date: "2025-07-20" },
    { title: "Photography Walk", location: "Riverfront Park", date: "2025-07-25" },
    { title: "Science Fair", location: "Downtown Cinema", date: "2025-07-30" }
];


function renderEvents(filterText = '', filterLocation = '') {
    const list = document.getElementById("event-list");
    list.innerHTML = '';

    const registeredEvents = JSON.parse(localStorage.getItem('registeredEvents') || '{}');
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const userEmail = user?.email;

    const filtered = events.filter(ev => {
        return (
            (filterText === '' || ev.title.toLowerCase().includes(filterText.toLowerCase())) &&
            (filterLocation === '' || ev.location === filterLocation)
        );
    });

    filtered.forEach(event => {
        const isRegistered = registeredEvents[userEmail]?.includes(event.title);
        const div = document.createElement("div");
        div.className = "event";
        div.innerHTML = `
            <h2>${event.title}</h2>
            <p><strong>Date:</strong> ${event.date}</p>
            <p><strong>Location:</strong> ${event.location}</p>
            <button ${isRegistered ? 'disabled' : ''} onclick="registerForEvent('${event.title}')">
                ${isRegistered ? 'Registered' : 'Register'}
            </button>
        `;
        list.appendChild(div);
    });
}


renderEvents();

// Search & Filter
const searchBox = document.getElementById('search-box');
const locationFilter = document.getElementById('location-filter');

searchBox.addEventListener('input', () => renderEvents(searchBox.value, locationFilter.value));
locationFilter.addEventListener('change', () => renderEvents(searchBox.value, locationFilter.value));

function registerForEvent(title) {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user) {
        alert("Please login first.");
        return;
    }

    let registeredEvents = JSON.parse(localStorage.getItem('registeredEvents') || '{}');

    if (!registeredEvents[user.email]) {
        registeredEvents[user.email] = [];
    }

    if (!registeredEvents[user.email].includes(title)) {
        registeredEvents[user.email].push(title);
        localStorage.setItem('registeredEvents', JSON.stringify(registeredEvents));
        alert(`Registered for ${title}`);
        renderEvents(); // refresh to disable button
    }
}
