require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectToDB = require('./db/db'); // Import the DB connection logic
const userRoutes = require('./routes/user.routes'); // Ensure this path is correct
const transactionRoutes = require('./routes/transaction.routes'); // Fixed path issue
const transactionHistoryRoutes = require('./routes/transactionHistory.routes'); // New transaction history routes
const walletController = require('./controller/wallet'); // Import the wallet controller

const app = express();

// Connect to the database
connectToDB();

// Middleware setup
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse incoming JSON requests
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded requests

// Root route for testing server
app.get('/', (req, res) => {
    res.send("Hello World! Server is running.");
});

// Use user-related routes
app.use('/user', userRoutes);

// Use transaction-related routes
app.use('/transaction', transactionRoutes);

// Use transaction history-related routes
app.use('/transaction-history', transactionHistoryRoutes);

// Add wallet-related route
app.post('/wallet', walletController.addMoney); // Add the wallet route for POST request

// 404 handler (if no route matches)
app.use((req, res) => {
    res.status(404).send("Route not found.");
});

// Global error handling (for any errors in async routes)
app.use((err, req, res, next) => {
    console.error('Global error handler:', err.stack);
    res.status(500).json({
        message: 'Something went wrong!',
        error: err.message || 'Unknown error'
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;
