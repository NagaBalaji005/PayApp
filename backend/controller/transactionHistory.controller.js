const TransactionModel = require('../models/transaction.model'); // Ensure this path is correct

// Controller to fetch transaction history by user ID
exports.getTransactionHistory = async (req, res) => {
    const { user_id } = req.params;
    try {
        // Fetch transaction history from the database for the given user ID
        const transactions = await TransactionModel.find({ userId: user_id });

        if (!transactions || transactions.length === 0) {
            return res.status(404).json({ message: 'No transactions found for the given user ID.' });
        }

        res.status(200).json({ transactions });
    } catch (error) {
        console.error('Error fetching transaction history:', error.message);
        res.status(500).json({
            error: 'Failed to fetch transaction history',
            details: error.message
        });
    }
};

// Controller to fetch all transactions (for admin or other purposes)
exports.getAllTransactions = async (req, res) => {
    try {
        // Fetch all transactions from the database
        const transactions = await TransactionModel.find();

        if (!transactions || transactions.length === 0) {
            return res.status(404).json({ message: 'No transactions found.' });
        }

        res.status(200).json({ transactions });
    } catch (error) {
        console.error('Error fetching all transactions:', error.message);
        res.status(500).json({
            error: 'Failed to fetch all transactions',
            details: error.message
        });
    }
};
