import { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Transaction from './pages/Transaction'; // Ensures proper naming for Transaction component
import TransactionHistory from './pages/TransactionHistory'; // Added TransactionHistory page
import Profile from './pages/Profile';
import SettingsPage from './pages/Settings';
import { AuthContext } from './Context/Context';
import { ToastContainer } from 'react-toastify';

function App() {
  const { user } = useContext(AuthContext); // Fetching user authentication details from context

  return (
    <div className="container h-screen">
      <Navbar />
      <ToastContainer />
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Authentication Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Transaction Pages */}
        <Route path="/transaction" element={<Transaction authenticatedUser={user} />} />
        <Route path="/transaction-history" element={<TransactionHistory authenticatedUser={user} />} />

        {/* User Profile and Settings */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
