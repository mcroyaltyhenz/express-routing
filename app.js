const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware to check working hours
app.use((req, res, next) => {
    const now = new Date();
    const day = now.getDay(); // 0-6 (Sunday-Saturday)
    const hour = now.getHours(); // 0-23
    
    if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
        next(); // Continue to the route
    } else {
        res.send(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Outside Working Hours</title>
                <link rel="stylesheet" href="/css/style.css">
            </head>
            <body>
                <div class="closed-message">
                    <h1>We're Closed</h1>
                    <p>Our website is only available during working hours (Monday-Friday, 9AM-5PM).</p>
                    <p>Please come back during these times.</p>
                </div>
            </body>
            </html>
        `);
    }
});

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'home.html'));
});

app.get('/services', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'services.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'contact.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
