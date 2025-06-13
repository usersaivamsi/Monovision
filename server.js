const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const fs = require('fs');

// ...existing code...
const serviceAccount = require("C:\\Users\\komma\\OneDrive\\Desktop\\keys\\serviceAccountKey.json");
// ...existing code...
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Signup Endpoint
app.post('/signup', async (req, res) => {
    const { name, email, mobile, password } = req.body;

    try {
        const userRef = db.collection('users').doc(email);
        const doc = await userRef.get();

        if (doc.exists) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        await userRef.set({ name, email, mobile, password });
        res.status(200).json({ message: 'Signup successful', user: { name, email, mobile } });

    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Login Endpoint
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const userRef = db.collection('users').doc(email);
        const doc = await userRef.get();

        if (!doc.exists || doc.data().password !== password) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const { name, mobile } = doc.data();
        res.status(200).json({ message: 'Login successful', user: { name, email, mobile } });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
