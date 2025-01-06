const express = require('express');
const router = express.Router();

// Import the transaction controller
const transactionController = require('../controller/transaction.controller');

// Route to fetch transaction history by user ID or any other identifier
router.get('/transaction-history/:user_id', async (req, res) => {
    try {
        // Call the appropriate method in the transaction controller to fetch transaction history
        await transactionController.getTransactionHistory(req, res);
    } catch (error) {
        console.error('Error in getTransactionHistory:', error.message);
        res.status(500).json({
            error: 'Failed to fetch transaction history',
            details: error.message
        });
    }
});

// Route to fetch all transactions (optional, for admin or specific use cases)
router.get('/all-transactions', async (req, res) => {
    try {
        // Call a controller method to fetch all transactions
        await transactionController.getAllTransactions(req, res);
    } catch (error) {
        console.error('Error in getAllTransactions:', error.message);
        res.status(500).json({
            error: 'Failed to fetch all transactions',
            details: error.message
        });
    }
});

module.exports = router;
