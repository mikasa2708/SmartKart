const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express(); // ✅ YE LINE MISSING THI! Ab 'app' define ho gaya hai.
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serving the 'public' folder (Taki HTML/CSS/JS files load ho sakein)
// Aapka structure 'public' folder use kar raha hai, isliye ye line zaroori hai.
app.use(express.static(path.join(__dirname, 'public')));

// Memory Database (Temporary storage jab tak server chal raha hai)
let users = [];

// --- API ROUTES ---

// 1. Signup Route
app.post('/api/signup', (req, res) => {
    const { name, email, password } = req.body;
    
    // Check if user already exists
    const exists = users.find(u => u.email === email);
    if (exists) return res.status(400).json({ success: false, message: "User already exists!" });

    users.push({ name, email, password });
    console.log(`👤 New User: ${name} (${email})`);
    res.json({ success: true, message: "User registered successfully!" });
});

// 2. Login Route
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        console.log(`🔑 Login Successful: ${email}`);
        res.json({ success: true, user: { name: user.name, email: user.email } });
    } else {
        console.log(`❌ Login Failed for: ${email}`);
        res.status(401).json({ success: false, message: "Invalid email or password!" });
    }
});

// 3. Simple Test Route (Browser mein http://localhost:3000/test check karein)
app.get('/test', (req, res) => {
    res.send("Server is working perfectly! 🚀");
});

// Server Start
app.listen(PORT, () => {
    console.log("------------------------------------------");
    console.log(`🚀 YumYard Server running at http://localhost:${PORT}`);
    console.log("------------------------------------------");
});