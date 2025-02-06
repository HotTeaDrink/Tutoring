const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors'); // Import the CORS package

const app = express();
const port = 3000;

// A secret key used to sign the JWT token (you should keep this private)
const SECRET_KEY = 'your-secret-key';

app.use(cors());

// Middleware to check for Bearer Token in Authorization header
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Get the Bearer token
    
    if (token == null) {
        return res.sendStatus(401); // If no token, send Unauthorized status
    }
    
    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            return res.sendStatus(403); // If token is invalid, send Forbidden status
        }
        req.user = user;
        next(); // Proceed to the next middleware or route handler
    });
}

// Example route that requires Bearer token authentication
app.get('/secured-data', authenticateToken, (req, res) => {
    res.json({
        message: 'This is secured data!',
        user: req.user // Send back user info if token is valid
    });
});

// Endpoint to login and get a Bearer token (for testing purposes)
app.post('/login', (req, res) => {
    // In a real scenario, you would authenticate the user here
    const username = 'testuser';
    const user = { name: username };
    
    // Create a JWT token
    const accessToken = jwt.sign(user, SECRET_KEY);
    
    res.json({
        accessToken: accessToken // Return the token to the client
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
