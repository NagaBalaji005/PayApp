import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const userUpiId = localStorage.getItem('userUpiId');

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/transaction/${userUpiId}`
        );
        setTransactions(response.data.transactions);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch transactions');
      } finally {
        setLoading(false);
      }
    };

    if (userUpiId) {
      fetchTransactions();
    }
  }, [userUpiId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6">Transaction History</h2>
        {transactions.length === 0 ? (
          <p>No transactions found</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left">Date</th>
                  <th className="px-6 py-3 text-left">Type</th>
                  <th className="px-6 py-3 text-left">UPI ID</th>
                  <th className="px-6 py-3 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {transactions.map((tx) => {
                  const isReceived = tx.receiver_upi_id === userUpiId;
                  return (
                    <tr key={tx._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        {new Date(tx.timestamp).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <span className={isReceived ? 'text-green-600' : 'text-red-600'}>
                          {isReceived ? 'Received' : 'Sent'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {isReceived ? tx.sender_upi_id : tx.receiver_upi_id}
                      </td>
                      <td className="px-6 py-4 text-right font-medium">
                        <span className={isReceived ? 'text-green-600' : 'text-red-600'}>
                          ₹{tx.amount.toFixed(2)}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionHistory;