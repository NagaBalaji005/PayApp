// transaction.controller.js
const transactionModel = require('../model/Transaction');
const userModel = require('../model/user.model');
const logger = require('../utils/logger');

module.exports.makeTransaction = async (req, res) => {
  const session = await userModel.startSession();
  session.startTransaction();

  try {
    const { sender_upi_id, receiver_upi_id, amount } = req.body;
    const numericAmount = parseFloat(amount);

    if (!sender_upi_id || !receiver_upi_id || !numericAmount) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (sender_upi_id === receiver_upi_id) {
      return res.status(400).json({ message: 'Cannot transfer to same account' });
    }

    const sender = await userModel.findOne({ upi_id: sender_upi_id }).session(session);
    const receiver = await userModel.findOne({ upi_id: receiver_upi_id }).session(session);

    if (!sender || !receiver) {
      await session.abortTransaction();
      return res.status(404).json({ 
        message: !sender ? 'Sender not found' : 'Receiver not found' 
      });
    }

    if (sender.balance < numericAmount) {
      await session.abortTransaction();
      return res.status(400).json({ message: 'Insufficient balance' });
    }

    await userModel.findOneAndUpdate(
      { upi_id: sender_upi_id },
      { $inc: { balance: -numericAmount } },
      { session, new: true }
    );

    await userModel.findOneAndUpdate(
      { upi_id: receiver_upi_id },
      { $inc: { balance: numericAmount } },
      { session, new: true }
    );

    const transaction = await transactionModel.create([{
      sender_upi_id,
      receiver_upi_id,
      amount: numericAmount,
      timestamp: new Date()
    }], { session });

    await session.commitTransaction();

    res.status(200).json({
      message: 'Transaction successful',
      transaction: transaction[0]
    });
  } catch (err) {
    await session.abortTransaction();
    logger.error(`Transaction failed: Sender: ${sender_upi_id}, Receiver: f95cb866@paytm, Amount: 1000, Error: Transaction failed`);
    res.status(500).json({ message: 'Transaction failed', error: err.message });
  } finally {
    session.endSession();
  }
};

module.exports.getTransactionsByUpi = async (req, res) => {
  const { upi_id } = req.params;
  try {
    const transactions = await transactionModel.find({ 
      $or: [{ sender_upi_id: upi_id }, { receiver_upi_id: upi_id }] 
    });

    if (!transactions.length) {
      return res.status(404).json({ message: 'No transactions found for this UPI ID' });
    }

    res.status(200).json(transactions);
  } catch (err) {
    console.error('Error fetching transactions:', err);
    res.status(500).json({ message: 'Failed to fetch transactions', error: err.message });
  }
};
