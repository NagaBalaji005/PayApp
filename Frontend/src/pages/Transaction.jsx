// Transaction.jsx
import React, { useState } from 'react';
import { Send, AlertCircle } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Transaction = () => {
  const [formData, setFormData] = useState({
    receiver_upi_id: '',
    amount: '',
  });
  const [status, setStatus] = useState({ loading: false, error: '' });
  const senderUpiId = localStorage.getItem('userUpiId') || '';

  const handleTransaction = async (e) => {
    e.preventDefault();
    if (!formData.receiver_upi_id.trim() || !formData.amount) {
      setStatus({ ...status, error: 'All fields are required' });
      return;
    }

    try {
      setStatus({ loading: true, error: '' });
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/transaction/transaction`,
        {
          sender_upi_id: senderUpiId,
          receiver_upi_id: formData.receiver_upi_id.trim(),
          amount: parseFloat(formData.amount)
        }
      );

      toast.success('Transaction successful');
      setFormData({ receiver_upi_id: '', amount: '' });
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Transaction failed';
      setStatus({ loading: false, error: errorMsg });
      toast.error(errorMsg);
    } finally {
      setStatus(prev => ({ ...prev, loading: false }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <form onSubmit={handleTransaction} className="p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Send Money</h2>
            <Send className="text-blue-500 h-6 w-6" />
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Receiver's UPI ID
              </label>
              <input
                type="text"
                name="receiver_upi_id"
                value={formData.receiver_upi_id}
                onChange={(e) => setFormData({...formData, receiver_upi_id: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amount
              </label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={(e) => setFormData({...formData, amount: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                min="1"
                step="0.01"
                required
              />
            </div>

            {status.error && (
              <div className="flex items-center gap-2 text-red-500">
                <AlertCircle className="h-5 w-5" />
                <p className="text-sm">{status.error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={status.loading}
              className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-semibold py-2 px-4 rounded-lg"
            >
              {status.loading ? 'Processing...' : 'Send Money'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Transaction;